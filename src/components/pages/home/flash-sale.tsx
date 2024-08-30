import { useFlashSaleProducts } from "@/hooks/useProduct";
import React from "react";
import ItemSkeleton from "../shop/item-skeleton";
import { Item } from "@/components/partials/card/item";

export default function FlashSaleSection() {
  const { data, isLoading, isError } = useFlashSaleProducts();

  const products = data?.products;

  if (isError) {
    return <div>Error from server</div>;
  }

  return (
    <>
      {isLoading &&
        Array.from({ length: 10 }, (value, index) => (
          <ItemSkeleton key={index} />
        ))}
      {products?.map((product, index) => (
        <Item key={index} productData={product} />
      ))}
    </>
  );
}
