import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useMovieStore } from '@/stores/movieStore';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export function Favorites() {
    const { isAuthenticated } = useAuth();
    const { fetchFavorites } = useMovieStore();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const loadFavorites = async () => {
                try {
                    setIsLoading(true);
                    setError(null);
                    const response = await fetchFavorites();
                    console.log('Favorites response:', response);
                    setFavorites(response.data);
                    console.log('Favorites data:', response.data);
                } catch (error: any) {
                    setError(error.message || 'Failed to load favorites');
                    toast.error('Failed to load favorites');
                } finally {
                    setIsLoading(false);
                }
            };
            loadFavorites();
        }
    }, [isAuthenticated, fetchFavorites]);

    if (!isAuthenticated) {
        return (
            <div className="container px-4 py-8">
                <PageHeader 
                    title="Favorites" 
                    description="Please login to view your favorite movies" 
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container px-4 py-8">
                <PageHeader title="Favorites" description="Loading your favorite movies..." />
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container px-4 py-8">
                <PageHeader title="Favorites" description="Error loading favorites" />
                <div className="mt-8 text-center text-red-500">{error}</div>
            </div>
        );
    }

    const favoriteMovies = Array.isArray(favorites) 
        ? favorites
            .filter(f => f.movie) // Ensure movie exists
            .map(f => f.movie)
        : [];

    return (
        <div className="container px-4 py-8">
            <PageHeader 
                title="Favorites" 
                description={`Your collection of ${favoriteMovies.length} favorite movies`}
            />

            <div className="mt-8">
                {favoriteMovies.length > 0 ? (
                    <MovieGrid movies={favoriteMovies} />
                ) : (
                    <div className="text-center text-muted-foreground">
                        {isLoading ? 'Loading favorites...' : 'You haven\'t added any movies to your favorites yet.'}
                    </div>
                )}
            </div>
        </div>
    );
}
