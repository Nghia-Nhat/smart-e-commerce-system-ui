import React from 'react';
import Link from 'next/link';
import { GlobeIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export const SubNavbar = () => {
    const listMenu = [
        {
            id: 1,
            name: 'Home',
            href: '/',
        },
        {
            id: 2,
            name: '🔥Hot deals',
            href: '/hot-deal',
        },
        {
            id: 3,
            name: 'Mall',
            href: '#',
        },
        {
            id: 4,
            name: 'Collections',
            href: '#',
        },
        {
            id: 5,
            name: 'Seller',
            href: '#',
        },
    ];
    return (
        <div className="flex px-5 h-fit items-center justify-between md:space-x-4 bg-orange-400 text-sm text-secondary-foreground">
            <div className="flex gap-2">
                {listMenu.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="p-2 h-full transition-all text-primary-foreground text-center hover:text-secondary-foreground"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="flex gap-4">
                <div className="flex gap-2 items-center cursor-pointer text-primary-foreground">
                    <GlobeIcon />
                    Language
                </div>
                <div className="flex gap-2 items-center cursor-pointer text-primary-foreground">
                    <QuestionMarkCircledIcon />
                    Help
                </div>
            </div>
        </div>
    );
};
