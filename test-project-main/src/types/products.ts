export type ProductType = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
};

export type ProductRes = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export type HomeSearchParams = {
  page: string;
  q: string;
};
