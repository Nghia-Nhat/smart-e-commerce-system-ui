'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SearchDialog } from './search/search-dialog';
import { ChatbotSheetSide } from './chatbot-sheet-side';
import { CartSheetSide } from './cart-sheet-side';
import { SubNavbar } from './sub-navbar';
import Logo from '../common/logo';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [stickNav, setStickNav] = useState('');

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

    return (
        <>
            <div className="hidden md:block">
                <SubNavbar />
            </div>
            <div className={`p-4 border-b ${stickNav}`}>
                <div className="max-w-8xl mx-auto flex justify-between items-center">
                    <Logo/>
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
                        {/* <ThemeController /> */}
                        <Button asChild variant="secondary">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
