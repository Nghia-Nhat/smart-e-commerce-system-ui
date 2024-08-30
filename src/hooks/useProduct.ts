import {
  fetchAllProducts,
  fetchAllProductsByImage,
  fetchAllProductsByDiscount,
  fetchOneProductByCategoryAndId,
  fetchFindProductsByTitle,
  fetchFlashSaleProducts,
  fetchRecommendProducts,
} from "@/apiRequests/product";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAllProducts(category: string, queryParams: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["products", defineParams, category],
    queryFn: () => fetchAllProducts(category, queryParams),
  });
}

export function useAllProductsByDiscount(queryParams: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["products", defineParams],
    queryFn: () => fetchAllProductsByDiscount(queryParams),
  });
}

export function useAllProductsByImage(
  file: File,
  queryParams: string,
  currentUser: any,
) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["productsByImage", [file, defineParams]],
    queryFn: () => fetchAllProductsByImage(file, queryParams, currentUser),
  });
}

export function useOneProductByCategoryAndId(category: string, id: string) {
  return useQuery({
    queryKey: ["product", category, id],
    queryFn: () => fetchOneProductByCategoryAndId(category, id),
  });
}

export function useFindProductsByTitle(queryParams: string) {
  return useQuery({
    queryKey: ["findProducts", queryParams],
    queryFn: () => fetchFindProductsByTitle(queryParams),
  });
}

export function useFlashSaleProducts() {
  return useQuery({
    queryKey: ["flash-sale-products"],
    queryFn: () => fetchFlashSaleProducts(),
  });
}

export function useRecommendProducts(username: string) {
  return useQuery({
    queryKey: ["recommend-products"],
    queryFn: () => fetchRecommendProducts(username),
  });
}
