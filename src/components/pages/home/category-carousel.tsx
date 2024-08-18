import { LaptopIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import * as React from 'react';
import { categories } from './category.constant';

export function CategoryCarousel() {
    return (
        <div className="flex flex-wrap justify-evenly gap-2 md:gap-10">
            {categories.map((category, index) => (
            <Link
                key={index}
                href={`/search?category=${category.category}`}
                className="w-20 h-20 md:w-24 md:h-24 border rounded-md flex justify-center items-center hover:text-primary hover:border-2 hover:border-primary"
            >
                <div>
                    {category.icon}
                    <div className='text-center text-sm mt-1'>{category.display_category}</div>
                </div>
            </Link>
            ))}
        </div>
    );
}
