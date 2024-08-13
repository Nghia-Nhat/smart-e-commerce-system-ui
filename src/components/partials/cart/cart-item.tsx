import { AlertDelete } from '@/components/common/alert-delete';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRemoveCartItem, useUpdateCartItemQuantity } from '@/hooks/useCart';
import { CartType } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CartItem({ data }: { data?: CartType }) {
    const [quantity, setQuantity] = useState(Number(data?.quantity));
    const { mutate: addToCart } = useUpdateCartItemQuantity(false);
    const { mutate: removeFromCart } = useRemoveCartItem();

    const product = data?.product;

    useEffect(() => {
        setQuantity(Number(data?.quantity))
    }, [data?.quantity])

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
        
        const productID = event.target.name;
        let newQuantity = parseInt(event.target.value);

        if (newQuantity < 1) {
            setQuantity(newQuantity);
            removeFromCart(productID);
            return;
        }

        let calcQuantity = newQuantity - quantity;

        if (isNaN(newQuantity)) {
            return;
        }

        const item = {
            productID,
            quantity: calcQuantity.toString(),
        };


        addToCart(item);
        setQuantity(newQuantity);
    };

    return (
        <div className="mb-5 border-b pb-2">
            <div className="flex gap-4">
                <Image
                    src={product?.imageURL}
                    width={100}
                    height={100}
                    alt={product?.productTitle}
                    className="w-16 h-16 object-cover"
                />
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
                                {(
                                    Number(priceAfterDiscount) * quantity
                                ).toFixed(2)}
                            </span>
                            <div className="relative">
                                <span className="line-through">
                                    ${(Number(price) * quantity).toFixed(2)}
                                </span>
                                <span className="absolute -top-1 -right-6 text-destructive text-[10px] font-bold">
                                    -{product.discount}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-2 justify-end">
                <div className="flex gap-2 items-center">
                    <span>Quantity: </span>
                    <Input
                        type="number"
                        name={product.productID}
                        className="max-w-[70px] p-2"
                        defaultValue={data?.quantity}
                        value={quantity}
                        onChange={handleChangeQuantity}
                    />
                </div>
                <AlertDelete id={product.productID} />
            </div>
        </div>
    );
}
