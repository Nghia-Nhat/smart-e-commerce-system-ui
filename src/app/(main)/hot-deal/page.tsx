"use client";

import ItemSkeleton from "@/components/pages/shop/item-skeleton";
import { MyPagination } from "@/components/pages/shop/pagination";
import { Item } from "@/components/partials/card/item";
import { useAllProductsByDiscount } from "@/hooks/useProduct";
import { useSearchParams } from "next/navigation";
import React from "react";

const HotDeal = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const { data, isLoading, isError } = useAllProductsByDiscount(queryParams);
  const products = data?.products;
  const currentPage = data?.currentPage;
  const lastPage = data?.lastPage;
  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
          {Array.from({ length: 8 }, (value, index) => (
            <ItemSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Error from server</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
        {products?.map((product, index) => (
          <Item key={index} productData={product} />
        ))}
      </div>
      <div className="my-10 flex justify-center">
        <MyPagination currentPage={currentPage || 1} lastPage={lastPage || 0} />
      </div>
    </>
  );
};

export default HotDeal;
