'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SearchDialog } from './search/search-dialog';
import { ChatbotSheetSide } from './chatbot-sheet-side';
import { CartSheetSide } from './cart/cart-sheet-side';
import { SubNavbar } from './sub-navbar';
import Logo from '../common/logo';
import useUserStore from '@/store/user.store';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import Cookies from 'js-cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useUser';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [stickNav, setStickNav] = useState('');
    const { isLogin, setIsLogin } = useUserStore();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isVisible = currentScrollPos > 50;
            setIsVisible(isVisible);
            if (isVisible) {
                setStickNav('sticky top-0 left-0 z-40 glassmorphism');
                return;
            }
            setStickNav('');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            setIsLogin(true);
        }
    }, [setIsLogin]);

    return (
        <>
            <div className="hidden md:block">
                <SubNavbar />
            </div>
            <div className={`p-4 border-b ${stickNav}`}>
                <div className="max-w-8xl mx-auto flex justify-between items-center">
                    <Logo />
                    <div className="flex items-center space-x-2">
                        <div className="hidden md:inline-flex">
                            <SearchDialog />
                        </div>
                        <div className="hidden md:inline-flex">
                            <ChatbotSheetSide side="right" />
                        </div>
                        <div className="hidden md:inline-flex">
                            <CartSheetSide side="right" />
                        </div>
                        {isLogin ? <AvatarComponent /> : <NotLogin />}
                    </div>
                </div>
            </div>
        </>
    );
}

export const NotLogin = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleRedirect = (e: any) => {
        const url = e.target.href;
        router.push(`${url}?returnURL=${pathname}?${searchParams.toString()}`)
    }

    return (
        <>
            <Button variant="secondary" onClick={handleRedirect}>
                <Link href="/login">Login</Link>
            </Button>
            <Button onClick={handleRedirect}>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    );
};

export const AvatarComponent = () => {
    const { setIsLogin } = useUserStore();
    const { data: user, isLoading } = useCurrentUser();

    const { replace } = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <Avatar>
                        <AvatarImage
                            className='object-cover'
                            src={user?.avatar || "/images/avtUser.png"}
                            alt="Avatar"
                        />
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <Link href={'/profile'}>My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setIsLogin(false);
                        replace('/')
                        Cookies.remove('access_token');
                    }}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
