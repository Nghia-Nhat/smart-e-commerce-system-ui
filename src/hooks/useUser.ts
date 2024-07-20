import { fetchCurrentUser } from '@/apiRequests/user';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => fetchCurrentUser(),
    });
}