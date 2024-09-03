"use client"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAdminUsers } from "@/hooks/useAdmin";

export default function CustomerPage() {
  const {data} = useAdminUsers();
  console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
