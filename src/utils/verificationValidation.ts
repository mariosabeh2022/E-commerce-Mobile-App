import { z } from 'zod';

export const schema = z.object({
  verificationCode: z
    .string()
    .regex(/^\d{4}$/, 'Each digit must be a number and the length should be 4')
    .max(4, 'Code cannot be longer than 4 digits'),
});
