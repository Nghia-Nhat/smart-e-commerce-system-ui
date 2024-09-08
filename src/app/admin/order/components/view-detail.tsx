import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAdminOrderById } from "@/hooks/useAdmin";
import { formatDate } from "@/lib/date.util";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ViewDetail({ orderId }: { orderId: string }) {
  const { data: orders, refetch } = useAdminOrderById(orderId);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orders) {
      setOrder(orders[0]);
    }
  }, [orders]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-primary" onClick={() => refetch()}>
          {orderId}
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>View detail</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-4 items-center gap-4">
            <div>Order ID:</div>
            <div className="col-span-3">{order?.orderId}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div>Status:</div>
            <div className="col-span-3">{order?.status}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div>Method:</div>
            <div className="col-span-3">{order?.method || "-"}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div>Created at:</div>
            <div className="col-span-3">{formatDate(order?.createdAt)}</div>
          </div>

          {order?.status === "unpaid" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div>Expired at:</div>
              <div className="col-span-3">{formatDate(order?.expiredAt)}</div>
            </div>
          )}

          <div>Products:</div>
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
              {order?.product.map((product: any, index: number) => (
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
      </SheetContent>
    </Sheet>
  );
}
