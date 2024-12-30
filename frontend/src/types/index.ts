export interface Movie {
    id: number;
    name: string;
    description: string;
    url: string;
    image: string;
    release_date: string;
    category_id: number;
    rating: number;
    created_at?: string;
    updated_at?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MovieWithCategory extends Movie {
    category?: {
        id: number;
        name: string;
    };
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
}

export interface Favorite {
    id: number;
    user_id: number;
    movie_id: number;
    movie: Movie;
    created_at: string;
}

export interface FavoritesResponse {
    data: Favorite[];
}

export interface LogoutResponse {
    message: string;
}
