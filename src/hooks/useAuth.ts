import { fetchLogin } from '@/apiRequests/auth';
import { useToast } from '@/components/ui/use-toast';
import { MESSAGE } from '@/lib/message';
import { useRouter } from 'next/navigation';
import { LoginResponse, LoginRequest } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import useUserStore from '@/store/user.store';

export function useLogin() {
    const { toast } = useToast();
    const { push } = useRouter();
    const { setIsLogin } = useUserStore();

    return useMutation({
        mutationFn: (credential: LoginRequest) => fetchLogin(credential),
        onSuccess: (data: LoginResponse) => {
            const { access_token, success } = data;
            if (!success) {
                throw new Error(MESSAGE.LOGIN_FAILURE);
            }
            // Login successfully
            Cookies.set('access_token', access_token, { expires: 1 }); // Expires in 1 day
            setIsLogin(true)
            
            push('/');
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.message,
            });
            return;
        },
    });
}
