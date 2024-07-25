export function parseJwt(token: string){
    if (!token) {
        return ;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export function isValidJwt(token: string) {
    const jwtRegex = /^[A-Za-z0-9-_=]+?\.[A-Za-z0-9-_=]+?\.[A-Za-z0-9-_.+/=]*$/;
    return jwtRegex.test(token);
}