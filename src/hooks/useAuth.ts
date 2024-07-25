'use client';

import { fetchLogin } from '@/apiRequests/auth';
import { useToast } from '@/components/ui/use-toast';
import { MESSAGE } from '@/lib/message';
import { useRouter } from 'next/navigation';
import { LoginResponse, LoginRequest } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import useUserStore from '@/store/user.store';
import { parseJwt } from '@/lib/jwt.util';

export function useLogin() {
    const { toast } = useToast();
    const { back } = useRouter();
    const { setIsLogin } = useUserStore();

    return useMutation({
        mutationFn: (credential: LoginRequest) => fetchLogin(credential),
        onSuccess: (data: LoginResponse) => {
            const { access_token, success } = data;
            if (!success) {
                throw new Error(MESSAGE.LOGIN_FAILURE);
            }
            // Login successfully
            const parsedToken = parseJwt(access_token);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const expiresIn = parsedToken.exp - currentTimestamp;
            Cookies.set('access_token', access_token, {
                expires: expiresIn / 86400,
            });

            setIsLogin(true);

            // Back to the previous page before going to login
            back();
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

export function useLogout() {
    const { setIsLogin } = useUserStore();
    const { replace } = useRouter();
    const logout = () => {
        setIsLogin(false);
        replace('/');
        Cookies.remove('access_token');
    };
    return { logout };
}
