import {z} from 'zod';
export const schema = z.object({
  name: z.string().trim().min(3, 'Name too short'),
  email: z.string().email('Email is invalid'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
  number: z
    .string()
    .regex(/^\d{2}-\d{6}$/, 'Invalid format. Expected format is xx-xxxxxx'),
});
