export type ProductType = {
  productID: string;
  imageURL: string;
  productTitle: string;
  price: number;
  rating: number;
  stock: number;
  discount: number;
  images?: Array<string>;
  description?: string;
  category?: string;
  location?: string;
  purchaseCount?: string;
};

export type ItemProps = {
  product: ProductType;
  category: string;
  purchaseCount: number;
  location?: string;
};

export type ProductsResponseType = {
  products: Array<{
    product: ProductType;
    category: string;
    purchaseCount: number;
  }>;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  totalProducts: number;
};

export type CartType = {
  product: ProductType;
  quantity: number;
};

export type CartRequestType = {
  productID: string;
  quantity: string;
};
export interface PaymentData {
  username: string;
  amount: number;
  description: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}
