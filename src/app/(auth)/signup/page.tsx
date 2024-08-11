'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useLogin, useRegister } from '@/hooks/useAuth';

const signUpSchema = z
    .object({
        full_name: z
            .string()
            .min(1, 'Full name is required')
            .max(30, 'Full name must not be at greater 30 characters'),
        username: z
            .string()
            .min(1, 'Username is required')
            .max(30, 'Username must not be at greater 30 characters'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm password must be at least 6 characters'),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: 'Passwords must match!',
            path: ['confirmPassword'],
        }
    );

function SignUpPage() {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            full_name: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { control, handleSubmit } = form;
    const { mutate: register } = useRegister();

    function onSubmit(data: z.infer<typeof signUpSchema>) {
        register(data);
    }

    return (
        <>
            <div className="w-full lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div className="hidden lg:flex bg-orange-100 items-center p-10 pt-0 relative">
                    <Image
                        src="/svg/shopping-bag-bro.svg"
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
                                Sign up
                            </h1>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="grid gap-2"
                            >
                                <FormField
                                    control={control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 mb-2">
                                            <FormLabel>Full name</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 mb-2">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
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
                                <FormField
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 mb-2">
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
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
                                    Sign up
                                </Button>
                                <Button variant={'outline'} onClick={(e: any) => e.preventDefault()}>
                                    <Link href="/login">Back to login</Link>
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
