import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
    const authStore = useAuthStore();
    const { initialize, isAuthenticated, user } = authStore;

    useEffect(() => {
        if (!isAuthenticated || !user) {
            initialize();
        }
    }, [initialize, isAuthenticated, user]);

    return authStore;
}
