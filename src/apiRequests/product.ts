import { BACKEND_BASE_URL } from "@/lib/constants";
import { ProductsResponseType, ProductType } from "@/types/product.type";

const BASE_API_URL = BACKEND_BASE_URL;
export async function fetchAllProducts(
  category: string,
  queryParams: string,
) {
  const url = BASE_API_URL + "/product/search" + `?${queryParams}`;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchAllProductsByDiscount(
  queryParams: string,
) {
  const url = BASE_API_URL + "/product/search" + `?${queryParams}`;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchAllProductsByImage(
  file: File,
  queryParams: string,
  currentUser: any,
) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("user", currentUser);
  const response = await fetch(
    BASE_API_URL + "/product/search-image" + `?${queryParams}`,
    {
      method: "POST",
      body: formData,
    },
  );
  const result = await response.json();
  return result;
}

export async function fetchOneProductByCategoryAndId(
  category: string,
  id: string,
) {
  const url = BASE_API_URL + "/product" + `/${category}` + `/${id}`;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchFindProductsByTitle(
  queryParams: string,
) {
  const url = BASE_API_URL + "/product/search?" + `${queryParams}`;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchFlashSaleProducts() {
  const url = BASE_API_URL + "/product/flash-sale";
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchRecommendProducts(
  username: string,
) {
  const user = username || "anonymous";
  const url = BASE_API_URL + "/product/recommend-api/" + user;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}
