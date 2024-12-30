import { create } from 'zustand';
import { api } from '@/lib/api';
import { Movie, Category, PaginatedResponse } from '@/types';

interface MovieState {
    movies: Movie[];
    categories: Category[];
    categoriesCurrentPage: number;
    categoriesTotalPages: number;
    categoriesIsLoading: boolean;
    categoriesError: string | null;
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
    fetchMovies: (page?: number, categoryId?: string, perPage?: number) => Promise<void>;
    fetchCategories: (page?: number, perPage?: number) => Promise<void>;
    fetchMovieById: (id: string) => Promise<Movie | null>;
    fetchCategoryById: (id: string) => Promise<Category | null>;
    set: (state: Partial<MovieState>) => void;
}

export const useMovieStore = create<MovieState>((set, get) => ({
    movies: [],
    categories: [],
    categoriesCurrentPage: 1,
    categoriesTotalPages: 1,
    categoriesIsLoading: false,
    categoriesError: null,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
    set: (state) => set(state),

    fetchMovies: async (page = 1, categoryId, perPage = 10) => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: perPage.toString(),
                ...(categoryId && { category_id: categoryId }),
            });

            const response = await api.get<PaginatedResponse<Movie>>(`/public/movies?${params.toString()}`);
            set({
                movies: response.data.data,
                currentPage: response.data.current_page,
                totalPages: response.data.last_page,
                isLoading: false,
            });
        } catch (error: any) {
            console.error(error);
            set({
                error: error.response?.data?.message || 'Failed to fetch movies',
                isLoading: false,
            });
        }
    },

    fetchAllMovies: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<Movie[]>('/public/movies/all');
            set({ movies: response.data, isLoading: false });
            return response.data;
        } catch (error: any) {
            console.error(error);
            set({
                error: error.response?.data?.message || 'Failed to fetch all movies',
                isLoading: false,
            });
            return [];
        }
    },

    fetchCategories: async (page = 1, perPage = 10) => {
        set({ categoriesIsLoading: true, categoriesError: null });
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: perPage.toString(),
            });
            const response = await api.get<PaginatedResponse<Category>>(`/public/categories?${params.toString()}`);
            
            if (!response.data?.data) {
                throw new Error('Invalid categories data received');
            }

            set({
                categories: response.data.data,
                categoriesCurrentPage: response.data.current_page,
                categoriesTotalPages: response.data.last_page,
                categoriesIsLoading: false,
            });
        } catch (error: any) {
            console.error('Categories fetch error:', error);
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               'Failed to fetch categories';
            set({
                categoriesError: errorMessage,
                categoriesIsLoading: false,
            });
            throw new Error(errorMessage);
        }
    },

    fetchMovieById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/public/movies/${id}`);
            set({ isLoading: false });
            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch movie',
                isLoading: false,
            });
            return null;
        }
    },

    createMovie: async (movieData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/admin/movies', movieData).catch(error => {
                if (error.response?.status === 403) {
                    throw new Error('Admin access required');
                }
                throw error;
            });
            
            set((state) => ({
                movies: [response.data.data, ...state.movies],
                isLoading: false
            }));
            
            return response.data.data;
        } catch (error: any) {
            let errorMessage = 'Failed to create movie';
            if (error.response?.data?.errors) {
                errorMessage = Object.values(error.response.data.errors).join(' ');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            set({
                error: errorMessage,
                isLoading: false,
            });
            throw new Error(errorMessage);
        }
    },

    updateMovie: async (id, movieData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/admin/movies/${id}`, {
                ...movieData,
                release_date: movieData.releaseDate,
                category_id: movieData.categoryId
            });
            set((state) => ({
                movies: state.movies.map(movie => 
                    movie.id === id ? response.data : movie
                ),
                isLoading: false
            }));
            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update movie',
                isLoading: false,
            });
            throw error;
        }
    },

    deleteMovie: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/admin/movies/${id}`);
            set((state) => ({
                movies: state.movies.filter(movie => movie.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to delete movie',
                isLoading: false,
            });
            throw error;
        }
    },

    fetchCategoryById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/public/categories/${id}`);
            set({ isLoading: false });
            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch category',
                isLoading: false,
            });
            return null;
        }
    },

    // Favorites
    fetchFavorites: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<FavoritesResponse>('/favorites');
            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch favorites',
                isLoading: false,
            });
            return [];
        }
    },

    addFavorite: async (movieId: number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/favorites', { movie_id: movieId });
            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to add favorite',
                isLoading: false,
            });
            throw error;
        }
    },

    removeFavorite: async (favoriteId: number) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/favorites/${favoriteId}`);
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to remove favorite',
                isLoading: false,
            });
            throw error;
        }
    },
}));
