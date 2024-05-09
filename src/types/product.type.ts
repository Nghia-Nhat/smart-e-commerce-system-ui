type ProductType = {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    rating: number;
    stock: number;
    discountPercentage: number;
    images?: Array<string>;
    description? : string;
    category? : string;
};

type ItemProps = {
    product: ProductType;
};