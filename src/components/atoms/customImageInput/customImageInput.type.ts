export type ImageType = {
  uri: string;
  _id: number;
};

export type CustomImageInputProps = {
  images: ImageType[];
  onImagesChange: (images: ImageType[]) => void;
};
