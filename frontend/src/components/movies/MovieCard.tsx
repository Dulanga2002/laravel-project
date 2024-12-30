import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
    index: number;
}

export function MovieCard({ movie, index }: MovieCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/movies/${movie.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[16/9]">
                        <img src={movie.image} alt={movie.name} className="object-cover w-full h-full" />
                        <Badge
                            variant={'secondary'}
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-slate-800  "
                        >
                            <Star className="w-5 h-5 mr-1 fill-primary stroke-none" />
                            {movie.rating}
                        </Badge>
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg truncate">{movie.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{movie.description}</p>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}
