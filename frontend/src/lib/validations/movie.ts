import * as z from 'zod';

export const movieSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    releaseDate: z.union([
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
        z.date()
    ]),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    rating: z.number().min(0).max(10),
    image: z.string().url('Must be a valid URL'),
    categoryId: z.number().min(1, 'Category is required'),
    url: z.string().url('Must be a valid URL'),
});
