import { ProductsResponseType } from '@/types/product.type';

export async function fetchAllProducts(
    queryParams: string
): Promise<ProductsResponseType> {
    const url = 'http://localhost:5000/product' + `?${queryParams}`;
    const response = await fetch(url);
    const res = (await response.json()) as ProductsResponseType;
    return res;
}

export async function fetchAllProductsByImage(
    file: File,
    queryParams: string
): Promise<ProductsResponseType> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('http://localhost:5000/product/search-image'+ `?${queryParams}`, {
        method: 'POST',
        body: formData,
    });
    const result = (await response.json()) as ProductsResponseType;
    return result
}
