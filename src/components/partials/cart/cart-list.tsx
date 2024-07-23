import React from 'react';
import CartItem from './cart-item';
import { useCartByUsername } from '@/hooks/useCart';

export default function CartList() {
    const { data: cart } = useCartByUsername('nghia');

    if (!cart) {
        return <div>Empty</div>;
    }

    return (
        <div >
            {cart.map((data, index) => (
                <div key={index} className='flex flex-col gap-5'>
                    <CartItem data={data} />
                </div>
            ))}
        </div>
    );
}
