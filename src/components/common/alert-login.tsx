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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function AlertLogin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleRedirect = (e: any) => {
        const url = '/login';
        router.push(`${url}?returnURL=${pathname}?${searchParams.toString()}`)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        This action need to login
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Please login to proceed your request
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRedirect}>Login</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
