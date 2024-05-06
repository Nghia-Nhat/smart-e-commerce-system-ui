import { CheckBoxItem } from '@/components/common/checkbox-item';
import { FilterIcon, StarIcon } from '@/components/icons/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const SearchFilter = () => {
    return (
        <aside className="hidden md:block p-5">
            <h2 className="flex items-center gap-2 font-bold">
                <FilterIcon className="h-4 w-4" /> SEARCH FILTER
            </h2>
            {/* Shipped from */}
            <div>
                <h3 className="my-5 font-semibold text-sm">Shipped from</h3>
                <div className="flex flex-col gap-4">
                    <CheckBoxItem id="HCM" label="Ho Chi Minh" />
                    <CheckBoxItem id="HN" label="Ha Noi" />
                    <CheckBoxItem id="DN" label="Da Nang" />
                    <CheckBoxItem id="VT" label="Vung Tau" />
                </div>
                <Separator className="my-6" />
            </div>
            {/* Shipping options */}
            <div>
                <h3 className="my-5 font-semibold text-sm">Shipping options</h3>
                <div className="flex flex-col gap-4">
                    <CheckBoxItem id="express" label="Express" />
                    <CheckBoxItem id="fast" label="Fast" />
                    <CheckBoxItem id="saving" label="Saving" />
                </div>
                <Separator className="my-6" />
            </div>
            {/* Price Range */}
            <div>
                <h3 className="my-5 font-semibold text-sm">Price Range</h3>
                <div>
                    <div className="flex gap-2 items-center">
                        <Input
                            className="hideArrowInputNumber"
                            placeholder="Min"
                            type="number"
                        />
                        <Separator className="w-5" />
                        <Input
                            className="hideArrowInputNumber"
                            placeholder="Max"
                            type="number"
                        />
                    </div>
                    <Button className="w-full mt-4">Apply</Button>
                </div>
                <Separator className="my-6" />
            </div>
            {/* Rating */}
            <div>
                <h3 className="my-5 font-semibold text-sm">Rating</h3>
                <div className="flex flex-col gap-2">
                    <button className="flex items-center">
                        {Array.from({ length: 5 }, (v, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                    </button>
                    <button className="flex items-center">
                        {Array.from({ length: 4 }, (v, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                        <span className='ml-2 text-sm'>& Up</span>
                    </button>
                    <button className="flex items-center">
                        {Array.from({ length: 3 }, (v, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                        <span className='ml-2 text-sm'>& Up</span>
                    </button>
                    <button className="flex items-center">
                        {Array.from({ length: 2 }, (v, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                        <span className='ml-2 text-sm'>& Up</span>
                    </button>
                    <button className="flex items-center">
                        {Array.from({ length: 1 }, (v, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                        <span className='ml-2 text-sm'>& Up</span>
                    </button>
                </div>
                <Separator className="mt-6" />
            </div>
            <Button className="w-full mt-4">Clear all</Button>

        </aside>
    );
};

export default SearchFilter;
