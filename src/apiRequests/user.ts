import { parseJwt } from '@/components/utils/jwt.util';
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
    return res;
}
