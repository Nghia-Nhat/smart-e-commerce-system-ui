'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { GoogleIcon } from '@/components/icons/common';
import { useLogin } from '@/hooks/useAuth';

const loginSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .max(30, 'Username must not be at greater 30 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

function LoginPage() {
    const { mutate: login } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const { control, handleSubmit } = form;

    function onSubmit(values: z.infer<typeof loginSchema>) {
        login(values);
    }

    return (
        <>
            <div className="w-full lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div className="hidden lg:flex bg-orange-100 items-center p-10 pt-0 relative">
                    <Image
                        src="/svg/shopping-pana.svg"
                        alt="Image"
                        width="1080"
                        height="1080"
                        className="dark:brightness-[0.2] dark:grayscale"
                        priority
                    />
                </div>
                <div className="flex items-center justify-center py-10 lg:pt-0">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                Log in
                            </h1>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="grid gap-4"
                            >
                                <FormField
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 mb-2">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 mb-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Log in
                                </Button>
                            </form>
                        </Form>
                        <Separator className="px-2" />
                        {/* <Button variant="outline">
                            <GoogleIcon className="mr-2 h-4 w-4" />
                            Login with Google
                        </Button> */}
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
