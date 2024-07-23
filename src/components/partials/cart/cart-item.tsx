import { Input } from '@/components/ui/input';
import { CartType, ProductType } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function CartItem({ data }: { data?: CartType }) {
    const [quantity, setQuantity] = useState(data?.quantity || 1);
    const product = data?.product;

    if (!product) {
        return;
    }

    const price = product.price;
    const priceAfterDiscount = Math.round(
        product.price * (1 - product.discount / 100)
    );

    const handleChangeQuantity = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    };
    return (
        <div className="flex gap-4 mb-5">
            <Image
                src={`${product?.imageURL}`}
                width={100}
                height={100}
                alt={`${product?.productTitle}`}
                className="w-16 h-16 object-cover bg-slate-400"
            ></Image>
            <div className="flex-auto grid grid-cols-1">
                <Link
                    href={`/${product?.category}/${product?.productID}`}
                    className="max-w-full truncate font-semibold"
                >
                    {product?.productTitle}
                </Link>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-destructive font-bold text-lg">
                            $
                            {(Number(priceAfterDiscount) * quantity).toFixed(2)}
                        </span>
                        <span className="line-through">
                            ${(Number(price) * quantity).toFixed(2)}
                        </span>
                        <span className="text-destructive text-sm font-bold">
                            -{product.discount}%
                        </span>
                    </div>
                    <Input
                        type="number"
                        className="max-w-[70px] p-2"
                        defaultValue={quantity}
                        min={1}
                        max={product?.stock}
                        onChange={handleChangeQuantity}
                    />
                </div>
            </div>
        </div>
    );
}
