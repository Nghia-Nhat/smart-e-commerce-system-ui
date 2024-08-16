"use client";
import Image from "next/image";
import ProductNotFound from "@/components/pages/error/product-not-found";
import ItemSkeleton from "@/components/pages/shop/item-skeleton";
import { MyPagination } from "@/components/pages/shop/pagination";
import { Item } from "@/components/partials/card/item";
import {
  useAllProductsByImage,
  useFindProductsByTitle,
} from "@/hooks/useProduct";
import useProductStore from "@/store/product.store";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const searchType = queryParams.includes("productTitle");

  if (searchType) {
    return <SearchProductTitle />;
  }
  return <SearchImage />;
};

// Search IMAGE
const SearchImage = () => {
  const { imageFile } = useProductStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  if (imageFile === null || imageFile.size === 0) {
    return (
      <div className="flex h-[50vh] md:h-[90vh] justify-center items-center">
        <Image
          src="/images/404.png"
          width={500}
          height={500}
          alt="Product not found"
          draggable="false"
          className="select-none"
        />
      </div>
    );
  }
  return (
    <>
      {imagePreview && (
        <div className="mb-6 flex justify-center">
          <Image
            src={imagePreview}
            alt="Searched Image"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      )}
      <SearchImageResult imageFile={imageFile} />
    </>
  );
};

const SearchImageResult = ({ imageFile }: { imageFile: File }) => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const { data, isLoading, isError, refetch } = useAllProductsByImage(
    imageFile,
    queryParams,
  );
  const products = data?.products;
  const currentPage = data?.currentPage;
  const lastPage = data?.lastPage;

  useEffect(() => {
    refetch();
  }, [imageFile])
  
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
    return (
      <div className="flex h-[50vh] md:h-[90vh] justify-center items-center">
        <Image
          src="/images/404.png"
          width={500}
          height={500}
          alt="Product not found"
          draggable="false"
          className="select-none"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
        {products?.map((product, index) => (
          <Item key={index} productData={product} />
        ))}
      </div>
      <div className="my-10 flex justify-center">
        {data && (
          <MyPagination
            currentPage={currentPage || 1}
            lastPage={lastPage || 0}
          />
        )}
      </div>
    </>
  );
};

// Search PRODUCT TITLE
const SearchProductTitle = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const productTitle = searchParams.get("productTitle");

  if (productTitle === null) {
    return (
      <div className="flex h-[50vh] md:h-[90vh] justify-center items-center">
        <Image
          src="/images/404.png"
          width={500}
          height={500}
          alt="Product not found"
          draggable="false"
          className="select-none"
        />
      </div>
    );
  }
  return <SearchProductTitleResult queryParams={queryParams} />;
};

const SearchProductTitleResult = ({
  queryParams,
}: {
  queryParams: string;
}) => {
  const { data, isLoading, isError } = useFindProductsByTitle(
    queryParams
  );
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
    return (
      <div className="flex h-[50vh] md:h-[90vh] justify-center items-center">
        <Image
          src="/images/404.png"
          width={500}
          height={500}
          alt="Product not found"
          draggable="false"
          className="select-none"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-2 md:gap-4">
        {products?.map((product, index) => (
          <Item key={index} productData={product} />
        ))}
      </div>
      <div className="my-10 flex justify-center">
        {data && (
          <MyPagination
            currentPage={currentPage || 1}
            lastPage={lastPage || 0}
          />
        )}
      </div>
    </>
  );
};

export default SearchResultPage;
