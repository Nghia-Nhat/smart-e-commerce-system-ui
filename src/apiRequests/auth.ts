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
    const result = await response.json();
    return result;
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

export async function fetchSaveAvatar(avatar: string, username: string) {
    const url = BACKEND_BASE_URL + '/auth/save-avatar';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar, username})
    });
    return response.json();
}