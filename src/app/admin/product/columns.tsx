"use client";

import { ProductType } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { AlertDeleteProduct } from "@/components/common/alert-delete-product";
import { Separator } from "@/components/ui/separator";
import DialogEditProduct from "@/components/pages/product/dialog-edit-product";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "productID",
    header: "Product ID",
  },
  {
    accessorKey: "imageURL",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.imageURL}
        height={100}
        width={100}
        className="object-contain max-w-10"
        alt={row.original.productTitle}
      />
    ),
  },
  {
    accessorKey: "productTitle",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating || 0;
      return rating + " / 5"
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => row.original.discount || 0,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "purchaseCount",
    header: "Purchase Count",
  },
  {
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.productID;
      const name = row.original.productTitle;
      
      return (
        <div className="flex h-4 items-center">
          <DialogEditProduct productID={id}/>
          <Separator orientation="vertical"/>
          <AlertDeleteProduct id={id} name={name}/>
        </div>
      );
    },
  },
];
