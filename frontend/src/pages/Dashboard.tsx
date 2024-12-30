import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieForm } from '@/components/dashboard/MovieForm';
import { MovieList } from '@/components/dashboard/MovieList';
import { PageHeader } from '@/components/shared/PageHeader';
import { toast } from 'sonner';
import { Movie } from '@/types';
import { useMovieStore } from '@/stores/movieStore';
import { useAuth } from '@/hooks/useAuth';

export function Dashboard() {
    const { user } = useAuth();
    const { movies, fetchMovies, createMovie, updateMovie, deleteMovie } = useMovieStore();
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchMovies();
        }
    }, [fetchMovies, user]);

    const handleSubmit = async (data: any) => {
        try {
            if (editingMovie) {
                await updateMovie(editingMovie.id, data);
                toast.success('Movie updated successfully');
            } else {
                await createMovie(data);
                toast.success('Movie added successfully');
            }
            handleCancel();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to save movie');
        }
    };

    const handleEdit = (movie: Movie) => {
        setEditingMovie(movie);
        setIsFormOpen(true);
    };

    const handleDelete = async (movie: Movie) => {
        try {
            await deleteMovie(movie.id);
            toast.success('Movie deleted successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete movie');
        }
    };

    const handleCancel = () => {
        setEditingMovie(null);
        setIsFormOpen(false);
    };

    if (user?.role !== 'admin') {
        return (
            <div className="container px-4 py-8">
                <PageHeader title="Dashboard" description="Admin access required" />
                <div className="text-center text-muted-foreground mt-8">
                    You don't have permission to access this page.
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8">
            <PageHeader title="Dashboard" description="Manage your movie collection" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                {isFormOpen ? (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">{editingMovie ? 'Edit Movie' : 'Add Movie'}</h2>
                        <MovieForm movie={editingMovie || undefined} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <Button onClick={() => setIsFormOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Movie
                            </Button>
                        </div>
                        <MovieList movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                )}
            </motion.div>
        </div>
    );
}
