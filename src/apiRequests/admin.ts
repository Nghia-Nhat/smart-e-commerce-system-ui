import { BACKEND_BASE_URL } from "@/lib/constants";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access_token");

const headers = {
  "Authorization": `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export async function fetchAdminProducts(queryParams?: string,) {
  const url = BACKEND_BASE_URL + "/admin/product" + `?${queryParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminDashboard(queryParams?: string ) {
  const defineParams = queryParams ?? "timeRange=P1M";
  const url = BACKEND_BASE_URL + "/admin/dashboard/product" + `?${defineParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminDashboardChart(queryParams?: string ) {
  const defineParams = queryParams ?? "timeRange=P1M";
  const url = BACKEND_BASE_URL + "/admin/dashboard/product/top-five" + `?${defineParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}

export async function fetchAdminUsers(queryParams?: string,) {
  const url = BACKEND_BASE_URL + "/users" + `?${queryParams}`;
  const response = await fetch(url, {
    headers,
  });
  const result = await response.json();
  return result;
}