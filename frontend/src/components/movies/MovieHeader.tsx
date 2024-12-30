import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MovieWithCategory } from '@/types';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieHeaderProps {
    movie: MovieWithCategory;
    badgeProps?: BadgeProps;
}

export function MovieHeader({ movie, badgeProps }: MovieHeaderProps) {
    return (
        <div className="relative h-[500px] sm:h-[700px] -mx-4 mb-12 overflow-hidden">
            {/* Background with parallax effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <img src={movie.image} alt={movie.name} className="object-cover w-full h-full scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-4 max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-t-xl p-6 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-center"
                    >
                        {/* Title with glowing effect */}
                        <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                            {movie.name}
                        </h1>

                        {/* Badges with hover effects */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    'text-sm px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hover:scale-105',
                                    badgeProps?.className
                                )}
                                {...badgeProps}
                            >
                                {new Date(movie.release_date).getFullYear()}
                            </Badge>
                            <Badge
                                variant="secondary"
                                className={cn(
                                    'flex items-center space-x-1 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hover:scale-105',
                                    badgeProps?.className
                                )}
                                {...badgeProps}
                            >
                                <Star className="w-4 h-4 stroke-none fill-amber-400 mr-1" />
                                {movie.rating}
                            </Badge>
                            {movie.category && (
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        'text-sm px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hover:scale-105',
                                        badgeProps?.className
                                    )}
                                    {...badgeProps}
                                >
                                    {movie.category.name}
                                </Badge>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 via-white/5 to-transparent backdrop-blur-sm" />
        </div>
    );
}
