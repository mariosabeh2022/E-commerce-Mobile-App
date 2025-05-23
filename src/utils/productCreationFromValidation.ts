import {z} from 'zod';
const imageSchema = z.object({
  uri: z.string().min(1, 'Image URL is required'),
  _id: z.string().min(1, '_id is required'),
});
export const schema = z.object({
  title: z.string().trim().min(3, 'Title too short'),
  description: z.string().trim().min(5, 'Description too short'),
  price: z
    .number({required_error: 'Price is required'})
    .min(1, 'Price must be at least 1')
    .max(10000, 'Unacceptable price'),
  location: z.object({
    name: z.string().min(3, 'Country is missing'),
    longitude: z.number(),
    latitude: z.number(),
  }),
  images: z.array(imageSchema).min(1, 'Image is required'),
});
