import { fetchPayOS, fetchPayPal } from "@/apiRequests/payment";
import { PaymentData } from "@/types/product.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function usePayOS() {
    return useMutation({
        mutationFn: (item: PaymentData) => fetchPayOS(item),
        onSuccess: () => {
            console.log("Pay success");
        },
        onError: () => {
            console.log("Pay failed");
        },
    });
}

export function usePayPal() {
    return useMutation({
        mutationFn: (item: PaymentData) => fetchPayPal(item),
        onSuccess: () => {
            console.log("OK");
        },
        onError: () => {
            console.log("Pay failed");
        },
    });
}