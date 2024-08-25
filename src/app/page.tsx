"use client";
import { WrapSection } from "@/components/utils/wrap-section";
import { CategoryCarousel } from "@/components/pages/home/category-carousel";
import Footer from "@/components/partials/footer";
import { HintSide } from "@/components/pages/home/hint-side";
import { HomeCarousel } from "@/components/pages/home/home-carousel";
import Navbar from "@/components/partials/navbar";
import NavbarMobile from "@/components/partials/navbar-mobile";
import Image from "next/image";
import React, { useState } from "react";
import Services from "@/components/pages/home/services";
import KeepInTouch from "@/components/pages/home/keep-in-touch";
import { Catalog } from "@/components/partials/catalog";
import ScrollToTop from "@/components/partials/scroll-to-top";
import FlashSaleSection from "@/components/pages/home/flash-sale";

const Home = () => {
  const [isViewMore, setViewMore] = useState(false);

  const handleViewMore = () => {
    setViewMore(true);
  }
  return (
    <>
      <div className="min-h-[100vh] h-fit pb-20">
        <Navbar />
        {/* BANNER SECTION */}
        <section className="mt-4 flex gap-1 p-2">
          <div className="hidden md:flex flex-col md:w-1/3 gap-1">
            <div>
              <Image
                src={`/images/thumbnail_5.jpg`}
                alt="thumbnail"
                width={1200}
                height={300}
                priority
                object-fit="cover"
                className="rounded-md"
              />
            </div>
            <div>
              <Image
                src={`/images/thumbnail_6.jpg`}
                alt="thumbnail"
                width={1200}
                height={300}
                object-fit="cover"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <HomeCarousel />
          </div>
        </section>

        {/* Category */}
        <WrapSection
          title="Categories"
          subtitle="🔍 Browse By Category"
          button={true}
          handleOnClick={handleViewMore}
        >
          <CategoryCarousel isViewMore={isViewMore} />
        </WrapSection>

        {/* Hint */}
        {/* Hot deals */}
        <WrapSection
          background={false}
          title="Recommend"
          subtitle="🌟 Just For You"
          button={false}
          countdown={false}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 justify-center gap-2 md:gap-4">
          <HintSide />
          </div>
        </WrapSection>

        {/* Hot deals */}
        <WrapSection
          background={true}
          title="Today's"
          subtitle="⚡Flash Sales"
          button={false}
          countdown={true}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 justify-center gap-2 md:gap-4">
            <FlashSaleSection />
          </div>
        </WrapSection>

        {/* Featured section */}
        <WrapSection title="Featured" subtitle="✨ New Arrival" button={false}>
          <Image
            src={`/images/2544919.jpg`}
            width={1200}
            height={300}
            object-fit="cover"
            alt="feature"
          />
        </WrapSection>

        <Services />

        <KeepInTouch />
      </div>

      {/* Some utils */}
      <ScrollToTop />
      <NavbarMobile />
      <Footer />
    </>
  );
};

export default Home;
