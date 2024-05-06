'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SortBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isActive, setActive] = useState(
        searchParams.get('sortBy') ?? 'relevancy'
    );

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleChangeQueryParams = (field: string, value: string) => {
        router.push(pathname + '?' + createQueryString(field, value));
        setActive(value);
    };

    const handleOnChange = (value: string) => {
        handleChangeQueryParams('sortBy', value);
    };

    const checkIfExists = (array: string[], element: string) => {
        if (array.includes(element)) {
            return element;
        }
        return undefined;
    }

    return (
        <div className="flex flex-wrap p-5 bg-secondary my-4 gap-4 items-center">
            <p className="text-slate-500 text-sm">Sort by:</p>

            {/* using useRouter */}
            <Button
                variant={isActive === 'relevancy' ? 'default' : 'outline'}
                onClick={() => handleChangeQueryParams('sortBy', 'relevancy')}
            >
                Relevance
            </Button>
            <Button
                variant={isActive === 'latest' ? 'default' : 'outline'}
                onClick={() => handleChangeQueryParams('sortBy', 'latest')}
            >
                Latest
            </Button>
            <Button
                variant={isActive === 'sales' ? 'default' : 'outline'}
                onClick={() => handleChangeQueryParams('sortBy', 'sales')}
            >
                Top Sales
            </Button>
            <Select onValueChange={handleOnChange} defaultValue={checkIfExists(['asc', 'desc'], isActive)}>
                <SelectTrigger className={`bg-background w-[220px] ${['asc', 'desc'].find((e) => e === isActive) ? 'text-primary' : ''}`}>
                    <SelectValue placeholder="Price"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">Price: From low to high</SelectItem>
                    <SelectItem value="desc">
                        Price: From high to low
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortBar;
