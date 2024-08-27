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

export function parseBase64ToJson(base64String: string) {
    try {
        // Decode the Base64 string
        const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
        
        // Parse the decoded string into a JSON object
        const jsonObject = JSON.parse(decodedString);

        return jsonObject;
    } catch (error) {
        console.error('Failed to parse Base64 string:', error);
        return null;
    }
}