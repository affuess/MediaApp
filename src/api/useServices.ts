import {authApi} from "./authApi";

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await authApi.get<UserProfile>('auth/me');
    return response.data;
};