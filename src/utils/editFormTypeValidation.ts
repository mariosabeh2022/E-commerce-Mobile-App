import {z} from 'zod';
export const schema = z.object({
  userName: z.string().trim().min(3, 'First Name too short'),
});
