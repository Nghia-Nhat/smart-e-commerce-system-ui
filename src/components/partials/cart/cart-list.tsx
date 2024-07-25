import React from 'react';
import CartItem from './cart-item';
import { useCartByUsername } from '@/hooks/useCart';
import { getCurrentUsername } from '@/lib/user.util';
import { useLogout } from '@/hooks/useAuth';

export default function CartList() {
    const username = getCurrentUsername();
    const { logout } = useLogout();

    const { data: cart } = useCartByUsername(username);

    if (!username) {
        logout()
    }

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
