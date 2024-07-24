import {Models} from 'appwrite';
import {z} from 'zod';

export const todoFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['Pending', 'Completed']),
  qrcode: z.string(),
});

export type Todo = Models.Document & z.infer<typeof todoFormSchema>;
