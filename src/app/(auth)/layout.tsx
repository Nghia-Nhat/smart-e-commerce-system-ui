'use client';
import React, { useState, useEffect } from 'react';
import Logo from '@/components/common/logo';
import Footer from '@/components/partials/footer';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
             <div className={`p-4 border-b ${stickNav}`}>
                <div className="max-w-8xl mx-auto flex justify-between items-center">
                    <Logo />
                </div>
            </div>
            <main className='min-h-[100vh] flex items-center'>{children}</main>
            <Footer />
        </>
    );
}
