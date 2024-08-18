"use client";
import { useCurrentUser } from "@/hooks/useUser";
import React, { use } from "react";
import { LoaderIcon } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/usePayment";
import { getCurrentUsername } from "@/lib/user.util";

export default function OrderContentPage() {
  const username = getCurrentUsername();
  const { data: orders } = useOrders(username)
  
  return (
    <div className="md:max-w-4xl">
      <div className="flex md:px-5">
        <div className="flex gap-5 items-center mb-5">
          <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
          <h2 className="text-orange-500 font-bold text-2xl">Orders</h2>
        </div>
      </div>

      <div className="px-5">
        <OrdersComponent />
      </div>
    </div>
  );
}

export function OrdersComponent() {
  const [activeTab, setActiveTab] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const paidOrders = [
    {
      id: "ORD001",
      total: 250.99,
      status: "Paid",
      date: "2023-05-01",
      products: [
        {
          id: "PROD001",
          name: "Product A",
          price: 99.99,
          quantity: 2,
        },
        {
          id: "PROD002",
          name: "Product B",
          price: 75.0,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD002",
      total: 149.99,
      status: "Paid",
      date: "2023-04-15",
      products: [
        {
          id: "PROD003",
          name: "Product C",
          price: 49.99,
          quantity: 3,
        },
      ],
    },
    {
      id: "ORD003",
      total: 399.99,
      status: "Paid",
      date: "2023-03-30",
      products: [
        {
          id: "PROD004",
          name: "Product D",
          price: 199.99,
          quantity: 2,
        },
        {
          id: "PROD005",
          name: "Product E",
          price: 99.99,
          quantity: 1,
        },
      ],
    },
  ];
  const unpaidOrders = [
    {
      id: "ORD004",
      total: 75.0,
      status: "Unpaid",
      date: "2023-06-01",
      products: [
        {
          id: "PROD006",
          name: "Product F",
          price: 25.0,
          quantity: 3,
        },
      ],
    },
    {
      id: "ORD005",
      total: 199.99,
      status: "Unpaid",
      date: "2023-05-20",
      products: [
        {
          id: "PROD007",
          name: "Product G",
          price: 99.99,
          quantity: 2,
        },
      ],
    },
  ];
  const canceledOrders = [
    {
      id: "ORD006",
      customer: "Emily Chen",
      total: 50.0,
      status: "Canceled",
      date: "2023-04-10",
      products: [
        {
          id: "PROD008",
          name: "Product H",
          price: 25.0,
          quantity: 2,
        },
      ],
    },
    {
      id: "ORD007",
      customer: "Alex Nguyen",
      total: 150.0,
      status: "Canceled",
      date: "2023-03-25",
      products: [
        {
          id: "PROD009",
          name: "Product I",
          price: 50.0,
          quantity: 3,
        },
      ],
    },
  ];
  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };
  return (
    <div className="container mx-auto py-8">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="flex border-b">
          <TabsTrigger value="paid" onClick={()=>setSelectedOrder(null)}>Paid</TabsTrigger>
          <TabsTrigger value="unpaid" onClick={()=>setSelectedOrder(null)}>Unpaid</TabsTrigger>
          <TabsTrigger value="canceled" onClick={()=>setSelectedOrder(null)}>Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="paid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchased at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-400 text-white hover:bg-green-400">{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
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
                <TableHead>Purchased at</TableHead>
                <TableHead>Expired at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unpaidOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.date}</TableCell>
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
                <TableHead>Purchased at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {canceledOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive">{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      {selectedOrder && (
        <div className="mt-8">
          <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">Order #{selectedOrder.id}</h2>
              {activeTab === "unpaid" && <Button variant={"default"} onClick={() => alert("What'sup")}>Pay now</Button>}
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
              {selectedOrder.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/svg/cat404.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
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
