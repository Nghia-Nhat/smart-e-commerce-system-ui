import { BACKEND_BASE_URL } from '@/lib/contants';
import { PaymentData } from '@/types/product.type';

export async function fetchPayOS(
    item: PaymentData
) {
    console.log("fetchPayOS");
    const url = BACKEND_BASE_URL + '/payment/create-payment-link';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    const result = await response.json();
    window.location.href = result.checkoutUrl;
}

export async function fetchPayPal(
    item: PaymentData
) {
    const url = BACKEND_BASE_URL + '/payment/pay';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    const result =  await response.json();
    window.location.href = result.href;
}