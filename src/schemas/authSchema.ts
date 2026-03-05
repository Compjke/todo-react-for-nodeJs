import { z } from 'zod';

export const loginSchema = z.object({
  userName: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    userName: z.string().min(1, 'Please enter your username'),
    password: z.string().min(1, 'Please enter your password'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(
    (val) => {
      return val.password === val.confirmPassword;
    },
    {
      error: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
