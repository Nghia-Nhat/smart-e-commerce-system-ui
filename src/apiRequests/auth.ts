import { BACKEND_BASE_URL } from "@/lib/constants";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth.type";

export async function fetchLogin(credential: LoginRequest): Promise<LoginResponse> {
    const url = BACKEND_BASE_URL + '/auth/login';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credential})
    });
    return response.json();
}

export async function fetchRegister(credential: RegisterRequest): Promise<any> {
    const url = BACKEND_BASE_URL + '/auth/register';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credential})
    });
    return response.json();
}