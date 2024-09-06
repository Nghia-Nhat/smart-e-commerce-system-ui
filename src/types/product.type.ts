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
  reviews?: string;
  locationId?: string;
};

export type ProductHasPaginate = {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  totalProducts: number;
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
  orderId?: string;
  username: string;
  amount: number;
  description: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}
