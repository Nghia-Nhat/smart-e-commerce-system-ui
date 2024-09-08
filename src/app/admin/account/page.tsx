"use client"

import { MyPagination } from "@/components/pages/shop/pagination";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAdminAccount } from "@/hooks/useAdmin";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DialogCreateAccount from "./components/dialog-create-account";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const queryParams = "role=true&" + searchParams.toString();
  const { data, isLoading } = useAdminAccount(queryParams);
  const users = data?.users;
  const currentPage = Number(data?.currentPage);
  const lastPage = data?.lastPage;
  const totalUserCount = data?.totalUserCount;

  return (

    <div>
      <div className="font-bold text-2xl">Account Management</div>
      <div className="mt-8 flex items-center">
        <div className="flex gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              // value={search}
              // onChange={handleSearchChange}
              // onKeyDown={handleSubmitWithEnter}
            />
          </div>
          {users && (
            <div className="font-bold text-sm py-2">
              Total {totalUserCount} account
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DialogCreateAccount/>
        </div>
      </div>  
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
