"use client";

import { ProductType } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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
        height={50}
        width={50}
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              onClick={() => alert(id)}
              className="flex gap-2 px-2 cursor-pointer"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="flex gap-2 px-2 cursor-pointer"
              onClick={() => alert(id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
