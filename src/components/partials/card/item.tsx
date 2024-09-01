import { LocationIcon } from "@/components/icons/common";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RatingStar from "../rating-star";

export const Item = ({ product }: { product: ProductType }) => {
  const discount = product?.discount;
  const priceBeforeDiscount = (product?.price * (1 + discount / 100)).toFixed(
    2,
  );

  return (
    <div className="relative flex w-full min-w-[200px] max-w-[230px] flex-col overflow-hidden rounded-lg border-gray-100 bg-white shadow-md border-2 hover:border-orange-400 hover:-translate-y-0.5">
      <Link href={`/${product?.category}/${product?.productID}`}>
        <div className="relative flex h-48 overflow-hidden">
          <Image
            src={product?.imageURL || "/svg/cat404.svg"}
            alt="thumbnail"
            width={500}
            height={500}
            className="object-cover"
            priority
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-destructive px-2 text-center text-sm font-medium text-white">
            {discount}% OFF
          </span>
        </div>
        <div className="px-3 pb-3">
          <h5 className="text-sm tracking-tight text-wrap text-slate-900 truncate line-clamp-2 mt-1 min-h-10">
            {product?.productTitle}
          </h5>
          <div className="mt-2 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RatingStar number={product?.rating} />
              </div>
              <p className="text-xs">Sold: {product?.purchaseCount || 0}</p>
            </div>
            <p className="mt-2">
              <span className="text-xl font-bold text-destructive mr-2">
                ${product?.price}
              </span>
              <span className="text-xs line-through text-slate-400">
                ${priceBeforeDiscount}
              </span>
            </p>
          </div>
        </div>
        <div className="px-3 pb-2 text-xs flex items-center gap-1">
          <LocationIcon className="h-3 w-3" />
          <span>{product?.location}</span>
        </div>
      </Link>
    </div>
  );
};
