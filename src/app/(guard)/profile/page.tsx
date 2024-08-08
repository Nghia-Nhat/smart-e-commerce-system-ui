'use client';
import { useCurrentUser, useUpdateProfile } from '@/hooks/useUser';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const schema = z.object({
    full_name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export default function ProfilePage() {
    const { data, isLoading } = useCurrentUser();

    if (isLoading) return <LoaderIcon className="animate-spin mt-10" />;

    return <ProfileContentPage user={data} />;
}

export function ProfileContentPage({ user }: { user: any }) {
    const { mutate: updateProfile } = useUpdateProfile();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            full_name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone ||'',
            address:  user?.address ||'',
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        updateProfile(data);
    };

    return (
        <div className="md:max-w-4xl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-4 space-y-6 md:p-6 md:flex md:gap-20"
                >
                    <header className="space-y-1.5">
                        <div className="flex flex-col items-center space-x-4">
                            <div className="w-20 h-20 md:w-52 md:h-52 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                            <div className="space-y-1.5 text-center mt-4">
                                <h1 className="text-2xl font-bold italic">
                                    @{user.username}
                                </h1>
                            </div>
                        </div>
                    </header>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                placeholder="Enter your email"
                                                type="email"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <Input
                                                placeholder="Enter your phone"
                                                type="tel"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Address</FormLabel>
                                            <Textarea
                                                placeholder="Enter your address"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button size="lg" type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            <div className="my-10 md:my-20">
                <div className="text-xl font-bold">History</div>
                <div className="mt-5">
                    <TableDemo />
                </div>
            </div>
        </div>
    );
}

const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
];

export function TableDemo() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                            {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                            {invoice.totalAmount}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
