type Product = {
  _id: string;
  description:string;
  price:number;
  count: number;
};

export type Store = {
  cartUserId: string;
  products: Product[];
  setCartUserId: (cartUserId: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
};
