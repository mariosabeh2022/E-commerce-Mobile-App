import {z} from 'zod';

export const schema = z.object({
  email: z.string().email('Email is invalid'),
  otp: z.string().max(6, 'Code cannot be longer than 6 digits'),
});
