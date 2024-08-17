"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useCartByUsername } from "@/hooks/useCart";
import { getCurrentUsername } from "@/lib/user.util";
import { useLogout } from "@/hooks/useAuth";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { usePayOS, usePayPal } from "@/hooks/usePayment";
import { PaymentData } from "@/types/product.type";

const schema = z.object({
  total: z.number(),
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  methodPayment: z.string().min(1, "Payment method is required"),
});

export default function CheckoutPage() {
  const username = getCurrentUsername();
  const { data: user } = useCurrentUser();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      total: 0,
      username: "",
      name: "",
      email: "",
      address: "",
      methodPayment: "paypal",
    },
  });

  const { mutate: payOS } = usePayOS();
  const { mutate: payPal } = usePayPal();

  const { setValue } = form;

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("address", user.address);
    }
  }, [user, setValue]);

  const { logout } = useLogout();

  if (!username) {
    logout();
  }

  const { data } = useCartByUsername(username);
  let subTotal = 0;

  const cart = data?.map((item) => {
    const price = item.product.price * item.quantity;

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
  useEffect(() => {
    if (total) {
      setValue("total", total);
    }
  }, [total, setValue]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!cart) return;

    const methodPayment = data.methodPayment;

    // Mapping data before sending to pay
    // PayOS
    const paymentData: PaymentData = {
      username: username,
      amount: 1000,
      description: "Thanh toan don hang",
      items: cart.map((item) => {
        return {
            name: item.productTitle,
            quantity: item.quantity,
            price: item.price,
          }
        }),
    };

    if(methodPayment==="payOS") {
      payOS(paymentData)
      return;
    }
    payPal(paymentData)

  };

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
                          <div className="font-medium">{item.productTitle}</div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Checkout</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              id="address"
                              placeholder="123 Main St, Anytown USA"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="methodPayment"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Payment Method</FormLabel>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="payOS" id="payOS" />
                              <Label htmlFor="card">PayOS</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal">PayPal</Label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
