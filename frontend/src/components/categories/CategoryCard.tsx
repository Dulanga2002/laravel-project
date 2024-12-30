import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    movieCount: number;
}

export function CategoryCard({ category, movieCount }: CategoryCardProps) {
    const navigate = useNavigate();
    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Card
                onClick={() => navigate(`/movies?category=${category.id}`)}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
                <CardHeader className="bg-muted">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <div className="flex items-center text-muted-foreground">
                            <Film className="w-4 h-4 mr-1" />
                            <span className="text-sm">{movieCount}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
