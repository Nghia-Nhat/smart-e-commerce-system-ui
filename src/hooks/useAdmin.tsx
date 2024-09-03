import { fetchAdminDashboard, fetchAdminDashboardChart, fetchAdminUsers } from "@/apiRequests/admin";
import { useQuery } from "@tanstack/react-query";

export function useAdminDashboard(queryParams?: string) {
  return useQuery({
    queryKey: ["adminDashboard", queryParams],
    queryFn: () => fetchAdminDashboard(queryParams),
  });
}

export function useAdminDashboardChart(queryParams?: string) {
  return useQuery({
    queryKey: ["adminDashboardChart", queryParams],
    queryFn: () => fetchAdminDashboardChart(queryParams),
  });
}

export function useAdminUsers(queryParams?: string) {
  return useQuery({
    queryKey: ["useAdminUsers", queryParams],
    queryFn: () => fetchAdminUsers(queryParams),
  });
}