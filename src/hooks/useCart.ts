import { fetchUserCart } from '@/apiRequests/cart';
import { useQuery } from '@tanstack/react-query';

export function useCartByUsername(username: string) {
    return useQuery({
        queryKey: ['userCart', username],
        queryFn: () => fetchUserCart(username),
    });
}