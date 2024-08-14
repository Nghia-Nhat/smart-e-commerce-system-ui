import { fetchAllProducts, fetchAllProductsByImage, fetchAllProductsByDiscount, fetchOneProductByCategoryAndId, fetchFindProductsByTitle } from '@/apiRequests/product';
import { useQuery } from '@tanstack/react-query';

export function useAllProducts(category: string, queryParams: string) {
    const defineParams = queryParams? queryParams: 'page=1'
    return useQuery({
        queryKey: ['products', defineParams, category],
        queryFn: () => fetchAllProducts(category, queryParams),
    });
}

export function useAllProductsByDiscount(queryParams: string) {
    const defineParams = queryParams? queryParams: 'page=1'
    return useQuery({
        queryKey: ['products', defineParams],
        queryFn: () => fetchAllProductsByDiscount(queryParams),
    });
}

export function useAllProductsByImage(file: File , queryParams: string) {
    const defineParams = queryParams? queryParams: 'page=1'
    return useQuery({
        queryKey: ['productsByImage', [file, defineParams]],
        queryFn: () => fetchAllProductsByImage(file, queryParams)
    });
}

export function useOneProductByCategoryAndId(category: string, id: string) {
    return useQuery({
        queryKey: ['product', category, id],
        queryFn: () => fetchOneProductByCategoryAndId(category, id),
    });
}

export function useFindProductsByTitle(queryParams: string) {
    return useQuery({
        queryKey: ['findProducts', queryParams],
        queryFn: () => fetchFindProductsByTitle(queryParams),
    });
}