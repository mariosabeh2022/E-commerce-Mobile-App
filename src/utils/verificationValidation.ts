import {z} from 'zod';

export const schema = z.object({
  email: z.string().email('Email is invalid'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
