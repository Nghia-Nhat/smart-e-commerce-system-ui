'use client';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useCartByUsername } from '@/hooks/useCart';
import { getCurrentUsername } from '@/lib/user.util';
import { useLogout } from '@/hooks/useAuth';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/useUser';

export default function CheckoutPage() {
    const username = getCurrentUsername();
    const { data: user } = useCurrentUser();

    const { logout } = useLogout();

    if (!username) {
        logout();
    }

    const { data } = useCartByUsername(username);
    let subTotal = 0;

    const cart = data?.map((item) => {
        const priceAfterDiscount = Math.round(
            item.product.price * (1 - item.product.discount / 100)
        );
        const price = priceAfterDiscount * item.quantity;
        subTotal += price;
        return {
            image: item.product.imageURL,
            productTitle: item.product.productTitle,
            quantity: item.quantity,
            price,
        };
    });

    const tax = subTotal * 0.08;
    const shippingFee = 5;
    const total = subTotal + shippingFee + tax;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-4 sm:p-6 md:p-8">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="text-muted-foreground">
                    Review your order and complete the purchase.
                </p>
            </div>
            <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 sm:p-6 md:p-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        <TableHead>Product name</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart?.length === 0 ? (
                                        <div>Empty</div>
                                    ) : (
                                        cart?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Image
                                                        width={40}
                                                        height={40}
                                                        src={item.image}
                                                        alt={item.productTitle}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {item.productTitle}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    ${item.price}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-medium">
                                <span>Subtotal</span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkout</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={user?.name}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={user?.email}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={user?.address}
                                    placeholder="123 Main St, Anytown USA"
                                    rows={3}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="payment">Payment Method</Label>
                                <RadioGroup id="payment" defaultValue="card">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            id="card"
                                            value="card"
                                        />
                                        <Label htmlFor="card">
                                            Credit/Debit Card
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            id="paypal"
                                            value="paypal"
                                        />
                                        <Label htmlFor="paypal">PayPal</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Place Order
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </div>
    );
}
