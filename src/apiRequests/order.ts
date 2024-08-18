import { BACKEND_BASE_URL } from '@/lib/contants';
import { CartType, CartRequestType } from '@/types/product.type';

export async function fetchAllOrders(
    username: string
) {
    const url = BACKEND_BASE_URL + '/payment/get-all-orders';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });
    return response.json();
}