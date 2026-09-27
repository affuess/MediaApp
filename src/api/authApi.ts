import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../service/storage';
import { generateMockTokens } from '../utils/generateMockTokens';

const BASE_URL = "https://dummyjson.com";

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

authApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getAccessToken();

        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        }
                        return authApi(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = await getRefreshToken();

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken,
                    expiresInMins: 30,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;
                await saveTokens(accessToken, newRefreshToken);

                processQueue(null, accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return authApi(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                await clearTokens();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export interface RegisterPayload {
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export const registerAndCreateTokens = async (payload: RegisterPayload): Promise<AuthTokens> => {
    const { data: createdUser } = await axios.post(`${BASE_URL}/users/add`, {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
    });

    const tokens = generateMockTokens(`${createdUser.id ?? 'x'}-${payload.email}`);
    await saveTokens(tokens.accessToken, tokens.refreshToken);

    return tokens;
};