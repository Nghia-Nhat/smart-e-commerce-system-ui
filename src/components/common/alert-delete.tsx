import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRemoveCartItem } from '@/hooks/useCart';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

export function AlertDelete({ id }: { id: string }) {
    const { mutate: removeFromCart } = useRemoveCartItem();

    const handleRemoveItem = () => {
        removeFromCart(id);
    };
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-destructive" size={'icon'}>
                    <Trash className="h-4 w-4 text-destructive-foreground" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to remove this item?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive"
                        onClick={handleRemoveItem}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
