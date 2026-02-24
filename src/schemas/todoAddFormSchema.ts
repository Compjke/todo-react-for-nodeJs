import { z } from 'zod';

export const todoAddFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required!' })
    .max(100, { message: 'Title must be less than 100 characters!' })
    .refine(
      (val) => {
        console.log('val', val);
        return val.trim().length > 0;
      },
      {
        message: 'Title cannot be only spaces',
      },
    ),
});

export type AddFormData = z.infer<typeof todoAddFormSchema>;
