import {
  fetchAdminDashboard,
  fetchAdminDashboardChart,
  fetchAdminProductById,
  fetchAdminProducts,
  fetchAdminUsers,
  fetchDeleteProduct,
  fetchAdminOrders,
  fetchAdminOrderById,
  fetchAdminDashboardChart2,
} from "@/apiRequests/admin";
import { fetchRegister } from "@/apiRequests/auth";
import { useToast } from "@/components/ui/use-toast";
import { MESSAGE } from "@/lib/message";
import { RegisterRequest } from "@/types/auth.type";
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

export function useAdminDashboardChart2(queryParams?: string) {
  return useQuery({
    queryKey: ["adminDashboardChart2", queryParams],
    queryFn: () => fetchAdminDashboardChart2(queryParams),
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

export function useAdminRegister() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credential: RegisterRequest) => fetchRegister(credential),
    onSuccess: (data: any, credential) => {
      if (data.statusCode === 409) {
        throw new Error(data.message);
      }

      toast({
        variant: "success",
        description: MESSAGE.REGISTER_SUCCESS,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}