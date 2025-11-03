import z from 'zod/v3';

export const productSchema = z.object({
  title: z.string().min(3, 'Title is required!'),
  price: z.string().min(3, 'Price is required!'),
  description: z.string().min(3, 'Description is required!'),
  category: z.string().min(3, 'Category is required!'),
});

export type ProductFormField = z.infer<typeof productSchema>;
