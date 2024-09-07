import { BACKEND_BASE_URL } from "@/lib/constants";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access_token");

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export async function fetchAdminProducts(queryParams?: string) {
  const url = BACKEND_BASE_URL + "/admin/product" + `?${queryParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminDashboard(queryParams?: string) {
  const defineParams = queryParams ?? "timeRange=P1M";
  const url =
    BACKEND_BASE_URL + "/admin/dashboard/product" + `?${defineParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminDashboardChart(queryParams?: string) {
  const defineParams = queryParams ?? "timeRange=P1M";
  const url =
    BACKEND_BASE_URL + "/admin/dashboard/product/top-five" + `?${defineParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminUsers(queryParams?: string) {
  const url = BACKEND_BASE_URL + "/admin/user" + `?${queryParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminOrders(queryParams?: string) {
  const url = BACKEND_BASE_URL + "/admin/order" + `?${queryParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminUpload(files: File[]) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  const url = BACKEND_BASE_URL + "/admin/uploads";
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminCreateProduct(payload: any) {
  const url = BACKEND_BASE_URL + "/admin/product/add";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({...payload}),
  });
  const result = await response.json();
  return result;
}

export async function fetchDeleteProduct(productID: string) {
  const url = BACKEND_BASE_URL + "/admin/product/delete/" + productID;
  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminProductById(productID: string) {
  const url = BACKEND_BASE_URL + "/admin/product" + `/${productID}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminUpdateProduct(payload: any, productID: string) {
  const url = BACKEND_BASE_URL + "/admin/product/update/" + productID;
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({...payload}),
  });
  const result = await response.json();
  return result;
}