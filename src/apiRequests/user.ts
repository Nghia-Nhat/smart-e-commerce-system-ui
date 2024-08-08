import { parseJwt } from '@/lib/jwt.util';
import { BACKEND_BASE_URL } from '@/lib/contants';
import Cookies from 'js-cookie';

const BASE_API_URL = BACKEND_BASE_URL;
export async function fetchCurrentUser() {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        console.log('Access token not found')
        return;
    }

    const payload = parseJwt(accessToken)
    const url = BASE_API_URL + '/users' + `/${payload.username}`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    const response = await fetch(url, {
        headers,
    });
    const res = await response.json();
    if (!response.ok && res.statusCode === 401) {
        Cookies.remove('access_token');
        console.log('Access token expired, please login again')
        return;
    }
    return res;
}

export interface UpdateProfileType {
    full_name?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export async function fetchUpdateProfile(data: UpdateProfileType) {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        console.log('Access token not found')
        return;
    }
    console.log(data);
    const payload = parseJwt(accessToken)
    const url = BASE_API_URL + '/users' + `/${payload.username}`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
    };
    
    const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            ...data
        })
    });
    const res = await response.json();
    return res;
}
