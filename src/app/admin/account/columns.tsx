"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage  src={row.original.avatar || "/images/avtUser2.png"} alt="avatar" className="object-cover" />
      </Avatar>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Full name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
]
