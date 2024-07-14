'use client';

import ProductNotFound from '@/components/pages/error/product-not-found';
import ItemSkeleton from '@/components/pages/shop/item-skeleton';
import { MyPagination } from '@/components/pages/shop/pagination';
import { Item } from '@/components/partials/card/item';
import { useAllProductsByImage } from '@/hooks/useProduct';
import useProductStore from '@/store/product.store';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const SearchResultPage = () => {
    const { imageFile } = useProductStore();
    
    if (imageFile === null || imageFile.size === 0) {
        return <ProductNotFound/>;
    }
    return <SearchResult imageFile={imageFile} />;
};

const SearchResult = ({ imageFile }: { imageFile: File }) => {
    const searchParams = useSearchParams();
    const queryParams = searchParams.toString();
    const { data, isLoading, isError } = useAllProductsByImage(
        imageFile,
        queryParams
    );
    const products = data?.products;
    const currentPage = data?.currentPage;
    const lastPage = data?.lastPage;

    if (isLoading) {
        return (
            <>
                <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
                    {Array.from({ length: 8 }, (value, index) => (
                        <ItemSkeleton key={index} />
                    ))}
                </div>
            </>
        );
    }

    if (isError) {
        return <ProductNotFound/>;
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
                {products?.map((product, index) => (
                    <Item key={index} product={product} />
                ))}
            </div>
            <div className="my-10 flex justify-center">
                {data && (
                    <MyPagination
                        currentPage={currentPage || 1}
                        lastPage={lastPage || 0}
                    />
                )}
            </div>
        </>
    );
};

export default SearchResultPage;
