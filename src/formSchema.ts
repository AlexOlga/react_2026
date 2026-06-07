import { z } from 'zod';
import isEmail from './utils/isEmail';

export const formSchema = (countries: string[]) =>
  z
    .object({
      name: z.string().refine((value) => {
        if (!value) return false;
        const firstChar = value[0];
        return firstChar === firstChar.toUpperCase();
      }, 'First letter must be uppercase'),

      age: z.coerce
        .number()
        .refine((value) => value > 0, 'Age cannot be negative'),

      email: z.string().refine(isEmail, 'Invalid email'),

      password: z.string().min(1, 'Password is required'),

      confirmPassword: z.string().min(1, 'Confirm password is required'),

      gender: z.enum(['Male', 'Female', 'Other']),

      terms: z.boolean().refine((value) => value === true, {
        message: 'You must accept Terms & Conditions',
      }),

      country: z.string().refine((value) => {
        return countries.includes(value);
      }, 'Country must be selected from list'),
      
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords must match',
    });
