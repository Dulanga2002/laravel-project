import { useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { Pagination } from '@/components/shared/Pagination';
import { useMovieStore } from '@/stores/movieStore';

export function Categories() {
    const {
        categories,
        categoriesCurrentPage,
        categoriesTotalPages,
        categoriesIsLoading,
        categoriesError,
        fetchCategories,
        fetchAllMovies,
        movies,
    } = useMovieStore();

    // Calculate movie counts per category
    const movieCounts = useMemo(() => {
        const counts: { [key: number]: number } = {};
        movies.forEach((movie) => {
            if (movie.category_id) {
                counts[movie.category_id] = (counts[movie.category_id] || 0) + 1;
            }
        });
        return counts;
    }, [movies]);

    console.log('movieCounts:', movieCounts);
    console.log('movies', movies);

    useEffect(() => {
        const loadData = async () => {
            try {
                // First fetch all categories
                await fetchCategories();
            } catch (error) {
                console.error('Failed to load categories:', error);
                return; // Stop if categories fail
            }

            try {
                // Then fetch all movies
                await fetchAllMovies();
            } catch (error) {
                console.error('Failed to load movies:', error);
            }
        };
        
        loadData();
    }, [fetchCategories, fetchAllMovies]);

    const handlePageChange = (page: number) => {
        fetchCategories(page);
    };

    return (
        <div className="container px-4 py-8">
            <PageHeader title="Categories" description="Browse movies by category" />

            {categoriesIsLoading && <div>Loading categories...</div>}
            {categoriesError && <div className="text-red-500">{categoriesError}</div>}

            <div className="mt-8">
                <CategoryGrid categories={categories} movieCounts={movieCounts} />
            </div>

            {categoriesTotalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={categoriesCurrentPage}
                        totalPages={categoriesTotalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
