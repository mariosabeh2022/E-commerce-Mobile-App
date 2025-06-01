export interface createProductCredentials {
  token: string;
  title: string;
  description: string;
  price: number;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  images: {uri: string; _id: string}[];
}
