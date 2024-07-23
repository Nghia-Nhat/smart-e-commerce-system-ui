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
import { useQueryString } from '@/hooks/useQueryString';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export function MyPagination({
    currentPage,
    lastPage,
}: {
    currentPage: number;
    lastPage: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryString = useQueryString();
    const page = Number(queryString.page) || 1;

    const isFirstPage = currentPage !== 1;
    const isNextPage = page < lastPage;
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
                {isFirstPage ? (
                    <PaginationItem>
                        <PaginationPrevious
                            isActive
                            href={
                                pathname +
                                '?' +
                                createQueryString(
                                    'page',
                                    (currentPage - 1).toString()
                                )
                            }
                        />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <Button
                            className="cursor-not-allowed text-secondary-foreground"
                            variant={'ghost'}
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                            <span>Previous</span>
                        </Button>
                    </PaginationItem>
                )}
                {currentPage !== 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href={
                                pathname + '?' + createQueryString('page', '1')
                            }
                        >
                            <span>1</span>
                        </PaginationLink>
                    </PaginationItem>
                )}
                {lastPage === 1 && (
                    <PaginationItem>
                        <Button
                            className="cursor-not-allowed text-secondary-foreground"
                            variant={'ghost'}
                        >
                            <span>1</span>
                        </Button>
                    </PaginationItem>
                )}
                {currentPage > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {lastPage !== 1 && (
                    <>
                        {currentPage - 1 > 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    href={
                                        pathname +
                                        '?' +
                                        createQueryString(
                                            'page',
                                            (currentPage - 1).toString()
                                        )
                                    }
                                >
                                    {currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href={
                                    pathname +
                                    '?' +
                                    createQueryString(
                                        'page',
                                        currentPage.toString()
                                    )
                                }
                                className={
                                    currentPage === page
                                        ? 'bg-primary text-primary-foreground'
                                        : ''
                                }
                                isActive={currentPage === page}
                            >
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage + 1 < lastPage && (
                            <PaginationItem>
                                <PaginationLink
                                    href={
                                        pathname +
                                        '?' +
                                        createQueryString(
                                            'page',
                                            (currentPage + 1).toString()
                                        )
                                    }
                                >
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </>
                )}

                {currentPage + 2 < lastPage && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {currentPage < lastPage && (
                    <PaginationItem>
                        <PaginationLink
                            href={
                                pathname +
                                '?' +
                                createQueryString('page', lastPage.toString())
                            }
                        >
                            <span>{lastPage}</span>
                        </PaginationLink>
                    </PaginationItem>
                )}
                {isNextPage ? (
                    <PaginationItem>
                        <PaginationNext
                            isActive
                            href={
                                pathname +
                                '?' +
                                createQueryString(
                                    'page',
                                    (currentPage + 1).toString()
                                )
                            }
                        />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <Button
                            className="cursor-not-allowed text-secondary-foreground"
                            variant={'ghost'}
                        >
                            <span>Next</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
