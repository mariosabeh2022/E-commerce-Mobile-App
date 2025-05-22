import {create} from 'zustand';

type ImageType = {
  uri: string;
  _id: string;
};

type ImageStore = {
  images: ImageType[];
  setImage: (image: ImageType) => void;
  removeImage: (uri: string) => void;
  clearImages: () => void;
};

export const useImageStore = create<ImageStore>(set => ({
  images: [],
  setImage: image => set(state => ({images: [...state.images, image]})),
  removeImage: id =>
    set(state => ({
      images: state.images.filter(img => img._id !== id),
    })),
  clearImages: () => set({images: []}),
}));
