import { fetchCurrentUser, fetchUpdateProfile, UpdateProfileType } from '@/apiRequests/user';
import { useToast } from '@/components/ui/use-toast';
import { MESSAGE } from '@/lib/message';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => fetchCurrentUser(),
    });
}

export function useUpdateProfile() {
    const { toast } = useToast();
    
    return useMutation({
        mutationFn: (item: UpdateProfileType) => fetchUpdateProfile(item),
        onSuccess: () => {
            toast({
                variant: 'success',
                description: MESSAGE.SUCCESS,
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                description: MESSAGE.ERROR,
            });
        },
    });
}
