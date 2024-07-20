import { useAllProducts } from '@/hooks/useProduct';
import React from 'react';
import ItemSkeleton from '../shop/item-skeleton';
import { Item } from '@/components/partials/card/item';

export default function FlashSaleSection() {
    const { data, isLoading, isError } = useAllProducts('footwear', 'limit=8');

    const products = data?.products;

    if (isError) {
        return <h1>Error from server</h1>;
    }

    return (
        <>
            {isLoading &&
                Array.from({ length: 8}, (value, index) => (
                    <ItemSkeleton key={index} />
                ))}
            {products?.map((product, index) => (
                <Item key={index} product={product} />
            ))}
        </>
    );
}
