import { fetchAllProducts, fetchAllProductsByImage } from '@/apiRequests/product';
import { useQuery } from '@tanstack/react-query';

export function useAllProducts(queryParams: string) {
    const defineParams = queryParams? queryParams: 'page=1'
    return useQuery({
        queryKey: ['products', defineParams],
        queryFn: () => fetchAllProducts(queryParams),
    });
}

export function useAllProductsByImage(file: File , queryParams: string) {
    const defineParams = queryParams? queryParams: 'page=1'
    return useQuery({
        queryKey: ['productsByImage', [file, defineParams]],
        queryFn: () => fetchAllProductsByImage(file, queryParams)
    });
}