import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const LoginSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Email must be a valid email' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  }),
);

export const RegisterSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Email must be a valid email' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  }),
);
