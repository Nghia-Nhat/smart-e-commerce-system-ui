import { fetchAddProductToCart, fetchRemoveCartItem, fetchUserCart } from '@/apiRequests/cart';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { CartRequestType } from '@/types/product.type';
import { MESSAGE } from '@/lib/message';
import { getCurrentUsername } from '@/lib/user.util';

export function useCartByUsername(username: string) {
    return useQuery({
        queryKey: ['userCart', username],
        queryFn: () => fetchUserCart(username)
    });
}

export function useUpdateCartItemQuantity(isNotify = true) {
    const { toast } = useToast();
    const username = getCurrentUsername();
    const {refetch} = useCartByUsername(username)

    return useMutation({
        mutationFn: (item: CartRequestType) =>
            fetchAddProductToCart(username, item),
        onSuccess: () => {
            isNotify && toast({
                variant: 'success',
                description: MESSAGE.SUCCESS,
            });
            refetch()
        },
        onError: () => {
            toast({
                variant: 'destructive',
                description: MESSAGE.ERROR,
            });
        },
    });
}

export function useRemoveCartItem() {
    const { toast } = useToast();
    const username = getCurrentUsername();
    const {refetch} = useCartByUsername(username)

    return useMutation({
        mutationFn: (productID: string) =>
            fetchRemoveCartItem(username, productID),
        onSuccess: () => {
            refetch()
        },
        onError: (err) => {
            toast({
                variant: 'destructive',
                description: err.message || MESSAGE.ERROR,
            });
        },
    });
}