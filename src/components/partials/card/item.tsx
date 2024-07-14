import {
    LocationIcon,
    StarIcon,
} from '@/components/icons/common';
import { ItemProps } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Item: React.FC<ItemProps> = ({ product }) => {
    const discount = product.discount
    const price = Math.round(product.price * (1- (discount/100)))   

    return (
        <div className="relative flex w-full max-w-[230px] flex-col overflow-hidden rounded-lg border-gray-100 bg-white shadow-md border-2 hover:border-orange-400 hover:-translate-y-0.5">
            <Link href={`/${product.category}/${product.productID}`}>
                <div className="relative flex h-48 overflow-hidden">
                    <Image
                        src={product.imageURL}
                        alt="thumbnail"
                        width={500}
                        height={500}
                        className='object-cover'
                        priority
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-destructive px-2 text-center text-sm font-medium text-white">
                        {discount}% OFF
                    </span>
                </div>
                <div className="px-3 pb-3">
                    <h5 className="text-sm tracking-tight text-wrap text-slate-900 truncate line-clamp-2 mt-1 min-h-10">
                        {product.productTitle}
                    </h5>
                    <div className="mt-2 flex flex-col">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (v, i) => (
                                    <StarIcon key={i} className="h-3 w-3" />
                                ))}
                                <span className="ml-1 text-xs">{product.rating}</span>
                            </div>
                            <p className="text-xs">Stock: {product.stock}</p>
                        </div>
                        <p className="mt-2">
                            <span className="text-xl font-bold text-destructive">
                            ${price}
                            </span>
                            <span className="text-xs line-through text-slate-400">
                                ${product.price}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="px-3 pb-2 text-xs flex items-center gap-1">
                    <LocationIcon className="h-3 w-3" />
                    <span>Ho Chi Minh</span>
                </div>
            </Link>

            {/* <div className="px-3 pb-3 flex gap-2">
                <ToastSimple className="text-destructive hover:bg-destructive hover:text-destructive-foreground" description="🎊 Added to your wishlist already."/>
                <Button className="flex-1">
                    <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to cart
                </Button>
            </div> */}
        </div>
    );
};
