import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { error: 'Name is required.' }),
    lastName: z.string().min(1).optional(),
    email: z.email({ error: 'Email is required.' }),
    password: z.string({ error: 'Password is required'}).min(8, { error: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: "Passwords do not match"
  });

export const signInSchema = z
  .object({
    email: z.email({ error: 'Email is required.' }),
    password: z.string({ error: 'Password is required'}).min(8, { error: 'Password must be at least 8 characters.' }),
  })

export const editTaskSchema = z.object({
  title: z.string().min(1),
  themes: z.array(z.string()).min(1, {
    error: "Please select at least one item"
  }).optional(),
});