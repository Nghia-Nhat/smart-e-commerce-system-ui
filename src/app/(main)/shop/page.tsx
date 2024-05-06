'use client';

import ItemSkeleton from '@/components/pages/shop/item-skeleton';
import { PaginationDemo } from '@/components/pages/shop/pagination';
import { Item } from '@/components/partials/card/item';
import React, { useEffect, useState } from 'react';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=10')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, []);

    if (products.length === 0) {
        return (
            <>
                <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
                    {Array.from({length: 8}, (value, index) => (
                        <ItemSkeleton key={index} />
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
                {products.length !== 0 &&
                    products.map((product, index) => (
                        <Item key={index} product={product} />
                    ))}
            </div>
            <div className="my-10 flex justify-center">
                <PaginationDemo />
            </div>
        </>
    );
};

export default Shop;
