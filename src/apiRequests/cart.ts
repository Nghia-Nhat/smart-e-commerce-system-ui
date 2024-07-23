import { BACKEND_BASE_URL } from '@/lib/contants';
import { CartType } from '@/types/product.type';

const BASE_API_URL = BACKEND_BASE_URL;
export async function fetchUserCart(username: string): Promise<CartType[]> {
    const url = BASE_API_URL + '/cart' + `/${username}`;
    const response = await fetch(url);
    const res = await response.json();
    return res;
}

export async function fetchAddProductToCart(username: string, payload: any) {
    const url = BACKEND_BASE_URL + '/cart/'+ username + '/add';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...payload})
    });
    return response.json();
}