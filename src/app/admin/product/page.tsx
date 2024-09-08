"use client";

import React, { useCallback, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDownUp,
  PlusCircle,
  RotateCw,
  Search,
} from "lucide-react";
import { MyPagination } from "@/components/pages/shop/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import DialogNewProduct from "@/components/pages/product/dialog-new-product";
import { useAdminProducts } from "@/hooks/useAdmin";

export default function ProductTab() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const { data, isLoading, refetch } = useAdminProducts(queryParams);
  const products = data?.products;
  const currentPage = data?.currentPage;
  const lastPage = data?.lastPage;
  const totalProducts = data?.totalProducts;

  // Sort
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setActive] = useState(
    searchParams.get("sortBy") ?? "relevancy",
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChangeQueryParams = (field: string, value: string) => {
    router.push(pathname + "?" + createQueryString(field, value));
    setActive(value);
  };

  // Search
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleSubmitWithEnter = (e: any) => {
    if (e.keyCode === 32) return;
    if (e.keyCode === 13) {
      handleChangeQueryParams("productTitle", search)
      return;
    }
  };

  const handleRefresh = () => {
    router.replace("/admin/product")
    setActive("relevancy")
    setSearch("")
  }

  return (
    <div>
      <div className="font-bold text-2xl">Product Management</div>
      <div className="mt-8 flex items-center">
        <div className="flex gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSubmitWithEnter}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RotateCw className="h-3.5 w-3.5" />
          </Button>
          {products && (
            <div className="font-bold text-sm py-2">
              Total {totalProducts} products
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowDownUp className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Sort
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={isActive === "relevancy"}
                onClick={() => handleChangeQueryParams("sortBy", "relevancy")}
              >
                Updated
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isActive === "purchased_desc"}
                onClick={() =>
                  handleChangeQueryParams("sortBy", "purchased_desc")
                }
              >
                Purchase Count
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isActive === "rating_desc"}
                onClick={() => handleChangeQueryParams("sortBy", "rating_desc")}
              >
                Rating
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogNewProduct refetch={refetch}/>
        </div>
      </div>
      <div className="mt-2">
        <DataTable columns={columns} data={products || []}/>
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
  );
}
