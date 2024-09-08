import {
  fetchAdminDashboard,
  fetchAdminDashboardChart,
  fetchAdminProductById,
  fetchAdminProducts,
  fetchAdminUsers,
  fetchDeleteProduct,
  fetchAdminOrders,
  fetchAdminOrderById,
} from "@/apiRequests/admin";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["useAdminUsers", defineParams],
    queryFn: () => fetchAdminUsers(defineParams),
  });
}

export function useAdminOrders(queryParams?: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["useAdminOrders", defineParams],
    queryFn: () => fetchAdminOrders(defineParams),
  });
}

export function useAdminOrderById(orderId: string) {
  return useQuery({
    queryKey: ["useAdminOrders", orderId],
    queryFn: () => fetchAdminOrderById(orderId),
    enabled: false,
  });
}

export function useAdminProducts(queryParams?: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["adminProducts", defineParams],
    queryFn: () => fetchAdminProducts(defineParams),
  });
}

export function useAdminAccount(queryParams?: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["adminAccount", defineParams],
    queryFn: () => fetchAdminUsers(defineParams),
  });
}

export function useAdminProductById(productID: string) {
  return useQuery({
    queryKey: ["adminProductById", productID],
    queryFn: () => fetchAdminProductById(productID),
  });
}

export function useDeleteProduct() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (productID: string) => fetchDeleteProduct(productID),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Delete successfully",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
  });
}
