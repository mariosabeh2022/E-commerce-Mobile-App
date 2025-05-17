import {z} from 'zod';

export const schema = z.object({
  email: z.string().email('Email is invalid'),
  otp: z.string().min(6, 'Code must be 6 digits'),
});
