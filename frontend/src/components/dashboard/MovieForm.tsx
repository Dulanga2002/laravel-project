import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { movieSchema } from '@/lib/validations/movie';
import { useMovieStore } from '@/stores/movieStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types';

interface MovieFormProps {
    movie?: Movie;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export function MovieForm({ movie, onSubmit, onCancel }: MovieFormProps) {
    const { categories, fetchCategories, categoriesIsLoading, categoriesError } = useMovieStore();

    useEffect(() => {
        if (!categories.length) {
            fetchCategories();
        }
    }, [fetchCategories, categories.length]);

    const form = useForm({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            name: '',
            releaseDate: '',
            description: '',
            rating: 0,
            image: '',
            categoryId: 1,
            url: ''
        },
    });

    useEffect(() => {
        if (movie) {
            form.reset({
                name: movie.name,
                releaseDate: movie.release_date,
                description: movie.description,
                rating: movie.rating,
                image: movie.image,
                categoryId: movie.category_id,
                url: movie.url
            });
        }
    }, [movie, form.setValue]);

    const handleFormSubmit = (data: any) => {
        // Ensure all required fields are included
        const formData = {
            ...data,
            releaseDate: data.releaseDate,
            categoryId: Number(data.categoryId),
            rating: Number(data.rating),
            url: data.url || ''
        };
        
        onSubmit(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Movie name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="releaseDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Release Date</FormLabel>
                            <FormControl>
                                <Input 
                                    type="date" 
                                    {...field} 
                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Movie description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="https://example.com/image.jpg" 
                                    {...field} 
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value ? String(field.value) : ""}
                                defaultValue={movie ? String(movie.category_id) : ""}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categoriesIsLoading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <SelectItem key={i} value="loading" disabled>
                                                <Skeleton className="h-4 w-20" />
                                            </SelectItem>
                                        ))
                                    ) : categoriesError ? (
                                        <SelectItem value="error" disabled>
                                            Failed to load categories
                                        </SelectItem>
                                    ) : (
                                        categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">{movie ? 'Update Movie' : 'Add Movie'}</Button>
                </div>
            </form>
        </Form>
    );
}
