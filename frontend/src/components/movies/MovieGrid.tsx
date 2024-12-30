import { MovieCard } from './MovieCard';
import { Movie } from '@/types';

interface MovieGridProps {
    movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
        </div>
    );
}
