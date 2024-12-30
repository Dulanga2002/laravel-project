import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Star, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useEffect, useState } from 'react';
import { useMovieStore } from '@/stores/movieStore';
import { Movie } from '@/types';

export function Home() {
    const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
    const { fetchMovies } = useMovieStore();

    useEffect(() => {
        const loadFeaturedMovies = async () => {
            try {
                // Fetch all movies first
                await fetchMovies(1);
                // Get the first 3 movies from the store
                const allMovies = useMovieStore.getState().movies;
                setFeaturedMovies(allMovies.slice(0, 3));
            } catch (error) {
                console.error('Failed to load featured movies:', error);
            }
        };
        loadFeaturedMovies();
    }, [fetchMovies]);
    const heroTitle = useTypewriter('Your Ultimate Movie Experience', 50, 500);
    const heroSubtitle = useTypewriter(
        'Discover, track, and share your favorite movies with our curated collection',
        30,
        1500
    );

    return (
        <div className="space-y-24 pb-8">
            {/* Hero Section */}
            <section className="relative px-4 py-32 sm:px-6 lg:px-8 flex items-center bg-gradient-to-b from-background via-background/90 to-background overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <img
                        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-25 scale-110 blur-sm"
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-[']">
                            {heroTitle}
                            <span className="animate-pulse">|</span>
                        </h1>
                        <p className="text-xl text-muted-foreground min-h-[3.75rem]">
                            {heroSubtitle}
                            {!heroSubtitle && <span className="animate-pulse">|</span>}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/movies">
                            <Button size="lg" className="w-full sm:w-auto">
                                Browse Movies
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Movies */}
            <section className="space-y-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight">Featured Movies</h2>
                        <p className="text-lg text-muted-foreground">Our hand-picked selection of must-watch films</p>
                    </div>
                    <Link to="/movies">
                        <Button variant="ghost">
                            View all
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredMovies.map((movie, index) => (
                        <motion.div
                            key={movie.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-xl shadow-lg"
                        >
                            <Link to={`/movies/${movie.id}`}>
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                                    <h3 className="text-2xl font-bold mb-2 text-white">{movie.name}</h3>
                                    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="flex items-center text-sm text-white/90">
                                            <Star className="w-5 h-5 mr-1 fill-yellow-400 stroke-yellow-400" />
                                            {movie.rating}
                                        </span>
                                        <span className="text-sm text-white/75">
                                            {new Date(movie.release_date).getFullYear()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 sm:px-6 lg:px-8">
                {[
                    {
                        icon: PlayCircle,
                        title: 'Instant Streaming',
                        description: 'Watch your favorite movies instantly with our streaming service',
                    },
                    {
                        icon: Star,
                        title: 'Rate & Review',
                        description: 'Share your thoughts and rate movies to help others discover great content',
                    },
                    {
                        icon: Film,
                        title: 'Curated Collections',
                        description: 'Explore our hand-picked collections of movies for every mood and occasion',
                    },
                ].map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="space-y-4 p-6 rounded-xl hover:bg-accent/50 transition-colors duration-300"
                    >
                        <feature.icon className="w-10 h-10 text-primary" />
                        <h3 className="text-2xl font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
