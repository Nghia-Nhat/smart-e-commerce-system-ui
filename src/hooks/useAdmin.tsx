import { fetchAdminDashboard, fetchAdminDashboardChart, fetchAdminProductById, fetchAdminProducts, fetchAdminUsers, fetchDeleteProduct } from "@/apiRequests/admin";
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
  return useQuery({
    queryKey: ["useAdminUsers", queryParams],
    queryFn: () => fetchAdminUsers(queryParams),
  });
}

export function useAdminProducts(queryParams?: string) {
  const defineParams = queryParams ? queryParams : "page=1";
  return useQuery({
    queryKey: ["adminProducts", defineParams],
    queryFn: () => fetchAdminProducts(queryParams),
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
