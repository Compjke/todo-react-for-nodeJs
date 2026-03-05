import { z } from 'zod';

export const todoAddFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required!' })
    .max(50, { message: 'Title must be less than 50 characters!' })
    .refine(
      (val) => {
        return val.trim().length > 0;
      },
      {
        message: 'Title cannot be only spaces',
      },
    ),
  description: z
    .string()
    .max(100, { message: 'Description must be less than 100 characters!' })
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        if (val === '') return true;
        if (val.trim().length === 0) return false;
        return true;
      },
      {
        message: 'Description cannot be only spaces',
      },
    ),
});

export type AddFormData = z.infer<typeof todoAddFormSchema>;
