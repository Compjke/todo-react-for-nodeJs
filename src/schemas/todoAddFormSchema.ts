import { z } from "zod";

export const todoAddFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Max length is 50 characters"),

  description: z
    .string()
    .trim()
    .max(100, "Description must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

export type AddFormData = z.infer<typeof todoAddFormSchema>;