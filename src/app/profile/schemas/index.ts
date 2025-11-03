import z from 'zod/v3';

export const updateUserProfileSchema = z.object({
  firstname: z.string().min(1, 'First name is required!'),
  lastname: z.string().min(1, 'Last name is required!'),
  email: z.string().email('Invalid email format').min(1, 'Email is required!'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type UpdateUserProfileFormField = z.infer<
  typeof updateUserProfileSchema
>;
