export type customCartRenderItemProps = {
  item: {
    count: number;
    _id: string;
    title: string;
    description: string;
    price: number;
    images: {
      url: string;
      _id: string;
    }[];
  };
};
