"use client";

import { fetchLogin, fetchRegister, fetchSaveAvatar } from "@/apiRequests/auth";
import { useToast } from "@/components/ui/use-toast";
import { MESSAGE } from "@/lib/message";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useUserStore from "@/store/user.store";
import { parseJwt } from "@/lib/jwt.util";

export function useLogin() {
  const { toast } = useToast();
  const { push } = useRouter();
  const { setIsLogin } = useUserStore();
  const searchParams = useSearchParams();
  const returnURL = searchParams.get("returnURL") || "/";

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
      Cookies.set("access_token", access_token, {
        expires: expiresIn / 86400,
      });
      
      setIsLogin(true);

      if (parsedToken.isAdmin) {
        push('/admin');
      } else {
        // Back to the previous page before going to login
        push(returnURL);
      }

    },
    onError: (error) => {
      toast({
        variant: "destructive",
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
    replace("/");
    Cookies.remove("access_token");
  };
  return { logout };
}

export function useRegister() {
  const { toast } = useToast();
  const { mutate: login } = useLogin();

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

      login({
        username: credential.username,
        password: credential.password,
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

export function useSaveAvatar() {
  const { toast } = useToast();
  const { push } = useRouter();

  return useMutation({
    mutationFn: ({ avatar, username }: { avatar: string; username: string }) =>
      fetchSaveAvatar(avatar, username),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Uploaded your avatar",
      });
      
      window.location.reload();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}
