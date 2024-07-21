import { AlertLogin } from '@/components/common/alert-login';
import { ShoppingCartIcon } from '@/components/icons/common';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user.store';
import React from 'react';

export default function ButtonAddToCart() {
    const { isLogin } = useUserStore();

    if (!isLogin) {
        return (
            <AlertLogin>
                <Button className="flex-1">
                    <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to cart
                </Button>
            </AlertLogin>
        );
    }

    return (
        <Button className="flex-1">
            <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to cart
        </Button>
    );
}
