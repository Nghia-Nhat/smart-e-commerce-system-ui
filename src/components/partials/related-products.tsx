import { ProductType } from "@/types/product.type";
import ItemSkeleton from "../pages/shop/item-skeleton";
import { Item } from "./card/item";

interface RelatedProductProps {
  products: ProductType[];
  isLoading: boolean;
}

export default function RelatedProduct({
  products,
  isLoading,
}: RelatedProductProps) {
  return (
    <>
      {isLoading &&
        Array.from({ length: 8 }, (value, index) => (
          <ItemSkeleton key={index} />
        ))}
      {products?.map((data, index) => <Item key={index} product={data} />)}
    </>
  );
}
