import { useRecommendProducts } from "@/hooks/useProduct";
import React from "react";
import ItemSkeleton from "../shop/item-skeleton";
import { Item } from "@/components/partials/card/item";
import { getCurrentUsername } from "@/lib/user.util";
import { ProductType } from "@/types/product.type";

export const HintSide = () => {
  const username: string = getCurrentUsername();
  const { data, isLoading, isError } = useRecommendProducts(username || "");

  const products: ProductType[] = data?.products;

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
        <Item key={index} product={product} />
      ))}
    </>
  );
};
