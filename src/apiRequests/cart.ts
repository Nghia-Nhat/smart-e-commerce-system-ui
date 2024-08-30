import { BACKEND_BASE_URL } from "@/lib/constants";
import { CartType, CartRequestType } from "@/types/product.type";

const BASE_API_URL = BACKEND_BASE_URL;
export async function fetchUserCart(username: string): Promise<CartType[]> {
  const url = BASE_API_URL + "/cart" + `/${username}`;
  const response = await fetch(url);
  const res = await response.json();
  return res;
}

export async function fetchAddProductToCart(
  username: string,
  item: CartRequestType,
) {
  const url = BACKEND_BASE_URL + "/cart/" + username + "/add";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });
  return response.json();
}

export async function fetchRemoveCartItem(username: string, productID: string) {
  const url = BACKEND_BASE_URL + "/cart/" + username + "/delete";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productID }),
  });
  return response.json();
}
