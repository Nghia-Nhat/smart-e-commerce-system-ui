'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginationDemo() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={pathname + '?' + createQueryString('page', '1')}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href={pathname + '?' + createQueryString('page', '1')}
                        isActive
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href={pathname + '?' + createQueryString('page', '2')}
                    >
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href={pathname + '?' + createQueryString('page', '3')}
                    >
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href={pathname + '?' + createQueryString('page', '4')}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
