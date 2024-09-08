"use client"

import { MyPagination } from "@/components/pages/shop/pagination";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAdminAccount } from "@/hooks/useAdmin";
import { usePathname, useSearchParams } from "next/navigation";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const { data, isLoading } = useAdminAccount(queryParams);
  const users = data?.users;
  const currentPage = Number(data?.currentPage);
  const lastPage = data?.lastPage;
  const totalUserCount = data?.totalUserCount;

  return (

    <div>
      <div className="font-bold text-2xl">Account Management</div>
      <div className="mt-8">
        <DataTable columns={columns} data={users || []} />
        {!isLoading && (
            <div className="md:py-6">
              <MyPagination
                lastPage={lastPage || 0}
                currentPage={currentPage || 1}
              />
            </div>
          )}
      </div>
    </div>
  )
}
