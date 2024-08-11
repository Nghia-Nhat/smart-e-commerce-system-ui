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
    username: z.string().readonly(),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export default function ProfilePage() {
    const { data, isLoading } = useCurrentUser();

    if (isLoading)
        return (
            <div className="flex w-full justify-center">
                <LoaderIcon className="animate-spin mt-10" />
            </div>
        );

    return <OrderContentPage user={data} />;
}

export function OrderContentPage({ user }: { user: any }) {
    const { mutate: updateProfile } = useUpdateProfile();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            full_name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        updateProfile(data);
    };

    return (
        <div className="md:max-w-4xl">
            <div className="flex md:px-5 mb-10">
                <div className="flex gap-5 items-center mb-5">
                    <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
                    <h2 className="text-orange-500 font-bold text-2xl">
                        Orders
                    </h2>
                </div>
            </div>

           <div className='px-5'> <TableDemo /></div>
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
