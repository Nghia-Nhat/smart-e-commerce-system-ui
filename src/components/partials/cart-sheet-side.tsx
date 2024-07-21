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
import { ShoppingCartIcon } from '../icons/common';
import useUserStore from '@/store/user.store';
import { AlertLogin } from '../common/alert-login';

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
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription>Empty</SheetDescription>
                </SheetHeader>
                <div className="min-h-[80vh]"></div>
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
