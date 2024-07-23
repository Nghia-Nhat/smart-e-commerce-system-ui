'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCartIcon } from '../../icons/common';
import useUserStore from '@/store/user.store';
import { AlertLogin } from '../../common/alert-login';
import CartList from './cart-list';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

type SheetSideProps = {
    side: SheetSide;
};

export function CartSheetSide({ side }: SheetSideProps) {
    const { isLogin } = useUserStore();

    if (!isLogin) {
        return (
            <AlertLogin>
                <Button variant="ghost" size="icon">
                    <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem] text-light" />
                </Button>
            </AlertLogin>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem] text-light" />
                </Button>
            </SheetTrigger>
            <SheetContent side={side} aria-describedby={undefined}>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <div className="min-h-[80vh] pt-5">
                    <CartList />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="w-full">
                            Checkout
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
