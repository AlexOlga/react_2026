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

      password: z
        .string()
        .min(6, 'The password must be at least 6 characters long'),

      confirmPassword: z.string().min(6, 'Confirm password is required'),

      gender: z.enum(['Male', 'Female', 'Other']),
      img: z
        .any()
        .transform((value) => {
          if (value instanceof FileList) {
            return value.item(0);
          }
          if (value instanceof File) {
            return value;
          }

          return undefined;
        })
        .refine((file) => file && file.size > 0, 'Image is required')
        .refine((file) => {
          if (!(file instanceof File)) return false;
          return file.size <= 2 * 1024 * 1024;
        }, 'Max size 2MB'),

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
