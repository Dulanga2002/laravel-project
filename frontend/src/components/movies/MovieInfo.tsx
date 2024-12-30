import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MovieWithCategory } from '@/types';
import { Film, Info, Star } from 'lucide-react';

interface MovieInfoProps {
    movie: MovieWithCategory;
}

export function MovieInfo({ movie }: MovieInfoProps) {
    const { category } = movie;

    return (
        <Card className="p-8 my-5 bg-gradient-to-b from-background/50 via-background/70 to-background shadow-sm border border-muted/20 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="px-0 space-y-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                    <Info className="w-6 h-6 text-primary" />
                    Movie Details
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                    {movie.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-8 flex flex-wrap gap-4 px-0">
                {category && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-muted/10 rounded-xl border border-muted/20 hover:bg-muted/20 hover:border-muted/30 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                        <Film className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium">{category.name}</span>
                    </div>
                )}
                <div className="flex items-center gap-3 px-5 py-3 bg-muted/10 rounded-xl border border-muted/20 hover:bg-muted/20 hover:border-muted/30 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    <span className="text-base font-medium">{movie.rating} Rating</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-muted/10 rounded-xl border border-muted/20 hover:bg-muted/20 hover:border-muted/30 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                    <span className="text-base font-medium">Released: {new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    );
}
