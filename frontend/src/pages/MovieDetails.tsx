import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MovieHeader } from '@/components/movies/MovieHeader';
import { MovieInfo } from '@/components/movies/MovieInfo';
import { MovieWithCategory } from '@/types';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMovieStore } from '@/stores/movieStore';

export function MovieDetails() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { fetchMovieById, fetchCategoryById } = useMovieStore();
    const [movie, setMovie] = useState<MovieWithCategory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState<number | null>(null);

    const checkIfFavorite = async (movieId: number) => {
        try {
            const response = await useMovieStore.getState().fetchFavorites();
            const favorites = response.data;
            const favorite = favorites.find((f) => f.movie_id === movieId);
            if (favorite) {
                setIsFavorite(true);
                setFavoriteId(favorite.id);
            } else {
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error('Failed to check favorites:', error);
            setIsFavorite(false);
            setFavoriteId(null);
        }
    };

    const handleFavorite = async () => {
        if (!id) return;
        const movieId = parseInt(id);
        
        try {
            if (isFavorite && favoriteId) {
                await useMovieStore.getState().removeFavorite(favoriteId);
                setIsFavorite(false);
                setFavoriteId(null);
                // Removed from favorites
            } else {
                const favorite = await useMovieStore.getState().addFavorite(movieId);
                setIsFavorite(true);
                setFavoriteId(favorite.id);
                // Added to favorites
            }
        } catch (error) {
            console.error('Failed to update favorites');
        }
    };

    useEffect(() => {
        if (id && isAuthenticated) {
            checkIfFavorite(parseInt(id));
        }
    }, [id, isAuthenticated]);

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                const movieData = await fetchMovieById(id);
                if (movieData) {
                    // Fetch all categories first
                    const { categories } = useMovieStore.getState();
                    if (!categories.length) {
                        await useMovieStore.getState().fetchCategories();
                    }
                    
                    // Find the category from the store
                    const category = useMovieStore.getState().categories.find(
                        cat => cat.id === movieData.category_id
                    );
                    
                    setMovie({
                        ...movieData,
                        category: category || undefined
                    });
                }
            } catch (error: any) {
                setError(error.message || 'Failed to load movie');
            } finally {
                setIsLoading(false);
            }
        };

        loadMovie();
    }, [id, fetchMovieById, fetchCategoryById]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!movie) {
        return <div className="text-gray-100">Movie not found</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container py-0">
            <div className="max-w-6xl mx-auto space-y-8 relative">
                {isAuthenticated && (
                    <div className="fixed bottom-8 right-8 z-50">
                        <Button
                            variant="default"
                            onClick={handleFavorite}
                            className="rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Heart className={`w-6 h-6 ${isFavorite ? "text-white fill-white" : ""}`} />
                        </Button>
                    </div>
                )}
                <MovieHeader movie={movie} />
                <div className="my-36">
                    <MovieInfo movie={movie} />
                </div>
            </div>
        </motion.div>
    );
}
