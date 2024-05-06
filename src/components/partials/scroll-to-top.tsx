'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '../icons/common';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isVisible = currentScrollPos > 100;
            setIsVisible(isVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <div
                    className="fixed bottom-[5vh] md:bottom-0 right-0 z-50 m-5 rounded-full p-2 aspect-square bg-orange-200 text-primary-foreground cursor-pointer"
                    onClick={scrollToTop}
                >
                    <div className='p-2 bg-primary rounded-full'><ArrowUpIcon className="w-6 h-6 text-primary-foreground" /></div>
                </div>
            )}
        </>
    );
}

export default ScrollToTop;
