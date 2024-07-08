export type ProductType = {
    productID: number;
    imageURL: string;
    productTitle: string;
    price: number;
    rating: number;
    stock: number;
    discount: number;
    images?: Array<string>;
    description? : string;
    category? : string;
};

export type ItemProps = {
    product: ProductType;
};

export type ProductsResponseType = {
    products: ProductType[];
    totalPages: number;
    currentPage: number;
    lastPage: number;
    totalProducts: number;
}