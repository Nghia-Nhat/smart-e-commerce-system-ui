import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseBase64ToJson } from './lib/jwt.util';

// Define the paths that should be protected and the login path
const protectedPaths = ['/profile', '/orders', '/checkout', '/payment', '/admin/:path*'];
const authPath = ['/login', '/signup'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('access_token')?.value;
    
    // If the user is trying to access the login page and is already logged in, redirect them to the home page
    if (authPath.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user is trying to access a protected page and is not logged in, redirect them to the login page
    if (protectedPaths.includes(pathname) && !token) {
        return NextResponse.redirect(new URL(authPath[0], request.url));
    }

    if (pathname.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith("/admin") && token) {
        const base64Url = token?.split('.')[1];
        const base64 = base64Url?.replace('-', '+').replace('_', '/');
        const payload = parseBase64ToJson(base64 || "");
        if (!payload.isAdmin) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Continue with the request
    return NextResponse.next();
}

// Define the matcher to specify which routes should be handled by this middleware
export const config = {
    matcher: ['/login', '/profile', '/orders', '/checkout', '/payment', '/admin/:path*'],
};
