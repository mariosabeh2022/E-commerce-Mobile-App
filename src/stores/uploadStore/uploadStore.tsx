import {create} from 'zustand';
type ImageType = {
  uri: string;
  _id: string;
} | null;

type ImageStore = {
  images: ImageType; // singular now
  setImage: (image: ImageType) => void;
  clearImage: () => void;
};

export const useImageStore = create<ImageStore>(set => ({
  images: null,
  setImage: image => set({images: image}),
  clearImage: () => set({images: null}),
}));
