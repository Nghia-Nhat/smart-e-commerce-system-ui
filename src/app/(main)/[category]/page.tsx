"use client";
import Footer from "@/components/partials/footer";
import NavbarMobile from "@/components/partials/navbar-mobile";
import Navbar from "@/components/partials/navbar";
import SortBar from "@/components/pages/shop/sort-bar";
import SearchFilter from "@/components/pages/shop/search-filter";
import ScrollToTop from "@/components/partials/scroll-to-top";
import ItemSkeleton from "@/components/pages/shop/item-skeleton";
import { MyPagination } from "@/components/pages/shop/pagination";
import { Item } from "@/components/partials/card/item";
import { useAllProducts } from "@/hooks/useProduct";
import { useSearchParams, useParams } from "next/navigation";
import React from "react";
import PageNotFound from "@/components/pages/error/product-not-found";
import ImageNotFound from "@/components/pages/error/not-found";
import { ProductType } from "@/types/product.type";

const Shop = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const params = useParams<{ category: string }>();
  const { data, isLoading } = useAllProducts(params.category, queryParams);
  const products: ProductType[] = data?.products;
  const currentPage = data?.currentPage;
  const lastPage = data?.lastPage;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5">
        <SearchFilter />
        <section className="col-span-5 md:col-span-4">
          <SortBar />
          <main className="h-fit min-h-[90vh]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {isLoading &&
                Array.from({ length: 8 }, (value, index) => (
                  <ItemSkeleton key={index} />
                ))}
              {products?.map((product, index) => (
                <Item key={index} product={product} />
              ))}
            </div>
            {products?.length === 0 && <ImageNotFound />}
            <div className="my-10 flex justify-center">
              {products?.length !== 0 && (
                <MyPagination
                  currentPage={currentPage || 1}
                  lastPage={lastPage || 0}
                />
              )}
            </div>
          </main>
        </section>
      </div>

      {/* Some utils */}
      <ScrollToTop />
      <NavbarMobile />
      <Footer />
    </>
  );
};

export default Shop;
