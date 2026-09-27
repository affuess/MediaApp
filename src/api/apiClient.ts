import axios from "axios";
import { mmkvService } from "../service/mmkvStorage";

export const apiClient = axios.create({
    baseURL: 'https://api.template.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use((config) => {
    const token = mmkvService.getItem<string>('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});