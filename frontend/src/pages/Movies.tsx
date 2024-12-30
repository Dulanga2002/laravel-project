import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { PageHeader } from '@/components/shared/PageHeader';
import { Pagination } from '@/components/shared/Pagination';
import { useMovieStore } from '@/stores/movieStore';

export function Movies() {
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const {
        movies,
        currentPage,
        totalPages,
        isLoading,
        error,
        fetchMovies,
        fetchCategories,
        categories,
        set
    } = useMovieStore();

    useEffect(() => {
        // If we have a category filter, use the already fetched movies
        if (categoryFilter) {
            const allMovies = useMovieStore.getState().movies;
            const filteredMovies = allMovies.filter(movie => 
                movie.category_id.toString() === categoryFilter
            );
            useMovieStore.setState({ 
                movies: filteredMovies,
                currentPage: 1,
                totalPages: 1
            });
        } else {
            // If no category filter, fetch all movies
            fetchMovies(1);
        }
    }, [fetchMovies, categoryFilter]);

    const activeCategory = categories.find(cat => cat.id.toString() === categoryFilter);

    const handlePageChange = (page: number) => {
        fetchMovies(page, categoryFilter || undefined);
    };

    return (
        <div className="container px-4 py-8">
            <PageHeader 
                title="Movies" 
                description={
                    activeCategory 
                        ? `Showing movies in category: ${activeCategory.name}`
                        : "Browse our collection of amazing movies"
                }
            />
            
            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <div className="mt-8">
                <MovieGrid movies={movies} />
            </div>
            
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
