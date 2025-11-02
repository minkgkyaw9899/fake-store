import z from 'zod/v3';

export const loginSchema = z.object({
  username: z
    .string({ message: 'Invalid username type' })
    .min(1, 'Username is required!'),
  password: z
    .string({ message: 'Invalid password type' })
    .min(1, 'Password is required!'),
});

export type LoginFormField = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    username: z
      .string({ message: 'Invalid username type' })
      .min(1, 'Username is required!'),
    email: z
      .string({ message: 'Invalid email type' })
      .email('Invalid email format!')
      .min(1, 'Email is required!'),
    password: z
      .string({ message: 'Invalid password type' })
      .min(1, 'Password is required!'),
    confirmPassword: z
      .string({ message: 'Invalid confirm password type' })
      .min(1, 'Confirm Password is required!'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

export type SignUpFormField = z.infer<typeof signUpSchema>;
