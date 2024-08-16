import { BACKEND_BASE_URL } from '@/lib/contants';
import { ProductsResponseType, ProductType } from '@/types/product.type';

const BASE_API_URL = BACKEND_BASE_URL;
export async function fetchAllProducts(
    category: string,
    queryParams: string
): Promise<ProductsResponseType> {
    const url = BASE_API_URL + '/product' + `/${category}` + `?${queryParams}`;
    const response = await fetch(url);
    const res = await response.json();
    return res;
}

export async function fetchAllProductsByDiscount(
    queryParams: string
): Promise<ProductsResponseType> {
    const url = BASE_API_URL + '/product/discount' + `?${queryParams}`;
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
    const response = await fetch(
        BASE_API_URL + '/product/search-image' + `?${queryParams}`,
        {
            method: 'POST',
            body: formData,
        }
    );
    const result = (await response.json()) as ProductsResponseType;
    return result;
}

export async function fetchOneProductByCategoryAndId(
    category: string,
    id: string
): Promise<any> {
    const url = BASE_API_URL + '/product' + `/${category}` + `/${id}`;
    const response = await fetch(url);
    const res = await response.json();
    return res;
}

export async function fetchFindProductsByTitle(
    queryParams: string
): Promise<ProductsResponseType> {
    const url = BASE_API_URL + '/product/search?' + `${queryParams}`;
    const response = await fetch(url);
    const res = await response.json();
    return res;
}

export async function fetchFlashSaleProducts(
): Promise<ProductsResponseType> {
    const url = BASE_API_URL + '/product/flash-sale';
    const response = await fetch(url);
    const res = await response.json();
    return res;
}