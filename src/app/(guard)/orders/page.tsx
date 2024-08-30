"use client";

import React from "react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/usePayment";
import { getCurrentUsername } from "@/lib/user.util";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader } from "lucide-react";
import { PaymentData } from "@/types/product.type";
import { usePayOS, usePayPal } from "@/hooks/usePayment";
import { formatDate } from "@/lib/date.util";

type OrderItemType = {
  orderId: string;
  status: string;
  total?: number;
  createdAt: string;
  expiredAt: string;
  product: {
    productTitle: string;
    price: number;
    quantity: number;
    imageURL: string;
  }[];
};

export default function OrderContentPage() {
  const username = getCurrentUsername();
  const { data: orders } = useOrders(username);

  const paidOrders: OrderItemType[] = [];
  const unpaidOrders: OrderItemType[] = [];
  const canceledOrders: OrderItemType[] = [];

  if (!orders) return;

  for (let index = 0; index < orders.length; index++) {
    const temp = orders[index];

    const total = temp.product.reduce((acc: number, product: any) => {
      return acc + product.price * product.quantity;
    }, 0);

    const order = {
      ...temp,
      total,
    };

    if (order.status === "paid") {
      paidOrders.push(order);
    }

    if (order.status === "unpaid") {
      const currentDate = new Date().toISOString();

      // TODO: Reset Status at DB
      if (currentDate > order.expiredAt) {
        canceledOrders.push({
          ...order,
          status: "canceled",
        });
        continue;
      }
      unpaidOrders.push(order);
    }

    if (order.status === "canceled") {
      canceledOrders.push(order);
    }
  }

  return (
    <div className="md:max-w-4xl">
      <div className="flex md:px-5">
        <div className="flex gap-5 items-center mb-5">
          <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
          <h2 className="text-orange-500 font-bold text-2xl">Orders</h2>
        </div>
      </div>

      <div className="md:px-5">
        <OrdersComponent
          paidOrders={paidOrders}
          unpaidOrders={unpaidOrders}
          canceledOrders={canceledOrders}
        />
      </div>
    </div>
  );
}

export function OrdersComponent({
  paidOrders,
  unpaidOrders,
  canceledOrders,
}: {
  paidOrders: OrderItemType[];
  unpaidOrders: OrderItemType[];
  canceledOrders: OrderItemType[];
}) {
  const [activeTab, setActiveTab] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };
  return (
    <div className=" mx-auto py-8">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="flex border-b">
          <TabsTrigger value="paid" onClick={() => setSelectedOrder(null)}>
            Paid
          </TabsTrigger>
          <TabsTrigger value="unpaid" onClick={() => setSelectedOrder(null)}>
            Unpaid
          </TabsTrigger>
          <TabsTrigger value="canceled" onClick={() => setSelectedOrder(null)}>
            Canceled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidOrders.map((order) => (
                <TableRow
                  key={order.orderId}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>${order.total?.toFixed(2) || 0}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-400 text-white hover:bg-green-400">
                      {order.status && "Paid"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="unpaid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Expired at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unpaidOrders.map((order) => (
                <TableRow
                  key={order.orderId}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>${order.total?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-slate-500 hover:bg-slate-500">
                      {order.status && "Unpaid"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatDate(order.expiredAt)}</TableCell>
                  <TableCell>
                    <Button variant={"outline"}>Repaid</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="canceled">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {canceledOrders.map((order) => (
                <TableRow
                  key={order.orderId}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>${order.total?.toFixed(2) || 0}</TableCell>
                  <TableCell>
                    <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive">
                      {order.status && "Canceled"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      {selectedOrder && (
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">
              Order #{selectedOrder.orderId}
            </h2>
            {activeTab === "unpaid" && <PaymentDialog order={selectedOrder} />}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Quantity</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrder.product.map((product: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.imageURL || "/svg/cat404.svg"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-md truncate">
                    {product.productTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function PaymentDialog({ order }: { order: any }) {
  const [selectedMethod, setSelectedMethod] = useState("paypal");
  const [isSubmit, setIsSubmit] = useState(false);
  const username = getCurrentUsername();
  const { mutate: payOS } = usePayOS();
  const { mutate: payPal } = usePayPal();

  console.log(order);
  const onChange = (value: string) => {
    setSelectedMethod(value);
    console.log("Selected payment method:", value);
  };

  const onSubmit = () => {
    setIsSubmit(true);
    const methodPayment = selectedMethod;

    const paymentData: PaymentData = {
      orderId: order.orderId,
      username,
      amount: methodPayment === "payOS" ? 1000 : order.total,
      description: "Checkout orders",
      items: order.product.map((item: any) => {
        return {
          name: item.productTitle,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };

    if (methodPayment === "payOS") {
      payOS(paymentData);
      return;
    }
    payPal(paymentData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Pay now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        <div className="gap-4">
          <Label htmlFor="username" className="text-right">
            Choose a method
          </Label>
          <RadioGroup
            value={selectedMethod}
            onValueChange={onChange}
            className="flex mt-4 px-4 gap-10"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="payOS" id="payOS" />
              <Label htmlFor="payOS">PayOS</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            className="w-full flex gap-2 items-center mt-2"
            disabled={isSubmit}
            onClick={onSubmit}
          >
            {isSubmit && <Loader className="animate-spin" />}Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
