"use client"

import { formatDate } from "@/lib/date.util"
import { ColumnDef } from "@tanstack/react-table"
import ViewDetail from "./components/view-detail";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "orderId",
    header: "ID",
    cell: ({ row }) => {
      const orderId = row.original.orderId;
      return <ViewDetail orderId={orderId} />
    },
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const value = row.original.createdAt
      return formatDate(value)
    }
  },
  {
    accessorKey: "expiredAt",
    header: "Expired At",
    cell: ({ row }) => {
      const value = row.original.expiredAt
      const status = row.original.status
      if (status === "unpaid") {
        return formatDate(value);
      }
      return "-";
    }
  },
]
