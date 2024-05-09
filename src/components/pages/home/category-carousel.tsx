import { LaptopIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import * as React from 'react';

export function CategoryCarousel() {
    return (
        <div className="flex flex-wrap justify-evenly gap-2 md:gap-10">
            {Array.from({ length: 8 }).map((_, index) => (
            <Link
                key={index}
                href=""
                className="w-20 h-20 md:w-24 md:h-24 border rounded-md flex justify-center items-center hover:text-primary hover:border-2 hover:border-primary"
            >
                <div>
                    <LaptopIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>
                    <div className='text-center text-sm'>Laptop</div>
                </div>
            </Link>
            ))}
        </div>
    );
}
