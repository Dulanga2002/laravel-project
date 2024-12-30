import { motion } from 'framer-motion';
import { CategoryCard } from './CategoryCard';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryGridProps {
    categories: Category[];
    movieCounts: { [categoryId: number]: number };
}

export function CategoryGrid({ categories, movieCounts }: CategoryGridProps) {
    if (categories.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <CategoryCard category={category} movieCount={movieCounts[category.id] || 0} />
                </motion.div>
            ))}
        </div>
    );
}
