import { create } from 'zustand';
import { api } from '@/lib/api';
import { User, AuthResponse, LoginCredentials, RegisterCredentials, LogoutResponse } from '@/types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    initialize: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAdmin: () => {
        const user = get().user;
        if (!user) {
            return false;
        }
        return user.role === 'admin';
    },
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    initialize: async () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            try {
                await get().fetchUser();
                set({ 
                    isAuthenticated: true,
                    token,
                    user: {
                        ...get().user!,
                        role: role as 'admin' | 'user'
                    }
                });
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                set({ user: null, token: null, isAuthenticated: false });
            }
        }
    },

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await api.post<AuthResponse>('/auth/login', credentials);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.user.role);
            set({
                user: {
                    ...data.user,
                    role: data.user.role
                },
                token: data.access_token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            let errorMessage = 'Login failed. Please check your credentials.';

            if (error.response?.data?.errors) {
                // Handle Laravel validation errors
                errorMessage = Object.values(error.response.data.errors).join(' ');
            } else if (error.response?.data?.message) {
                // Handle other backend errors
                errorMessage = error.response.data.message;
            }

            set({
                error: errorMessage,
                isLoading: false,
            });
            throw new Error(errorMessage);
        }
    },

    register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await api.post<{ user: User }>('/auth/register', credentials);
            set({
                user: data.user,
                isLoading: false,
            });
        } catch (error: any) {
            console.log(error.response.data.message);
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await api.post<LogoutResponse>('/user/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Logout failed',
                isLoading: false,
            });
            throw error;
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await api.get<User>('/user');
            const role = localStorage.getItem('role') as 'admin' | 'user' || 'user';
            set({
                user: {
                    ...data,
                    role
                },
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: error.response?.data?.message || 'Failed to fetch user',
            });
        }
    },
}));
