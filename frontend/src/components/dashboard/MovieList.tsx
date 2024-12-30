import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types';

interface MovieListProps {
    movies: Movie[];
    onEdit: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
}

export function MovieList({ movies, onEdit, onDelete }: MovieListProps) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie, index) => (
                        <motion.tr
                            key={movie.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TableCell className="font-medium">{movie.name}</TableCell>
                            <TableCell>{new Date(movie.release_date).toLocaleDateString()}</TableCell>
                            <TableCell>{movie.rating}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(movie)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(movie)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
