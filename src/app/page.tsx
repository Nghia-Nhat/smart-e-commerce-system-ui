'use client';
import { WrapSection } from '@/components/utils/wrap-section';
import { CategoryCarousel } from '@/components/pages/home/category-carousel';
import Footer from '@/components/partials/footer';
import { HintSide } from '@/components/pages/home/hint-side';
import { HomeCarousel } from '@/components/pages/home/home-carousel';
import Navbar from '@/components/partials/navbar';
import NavbarMobile from '@/components/partials/navbar-mobile';
import Image from 'next/image';
import React from 'react';
import Services from '@/components/pages/home/services';
import KeepInTouch from '@/components/pages/home/keep-in-touch';
import { Catalog } from '@/components/partials/catalog';
import ScrollToTop from '@/components/partials/scroll-to-top';
import FlashSaleSection from '@/components/pages/home/flash-sale';

const Home = () => {
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

                <section className="mt-4 flex gap-1 p-2">
                    <Catalog />
                </section>

                <section className="mt-6 flex gap-1 md:px-16 md:py-6 bg-secondary">
                    <HintSide />
                </section>

                {/* Category */}
                <WrapSection
                    title="Categories"
                    subtitle="🔍 Browse By Category"
                >
                    <CategoryCarousel />
                </WrapSection>

                {/* Hot deals */}
                <WrapSection
                    background={true}
                    title="Today's"
                    subtitle="⚡Flash Sales"
                    button={false}
                    countdown={true}
                >
                    <div className="flex overflow-x-auto max-w-screen gap-4 scrollbar-hide md:ml-10 py-2">
                        <FlashSaleSection />
                    </div>
                </WrapSection>

                {/* Featured section */}
                <WrapSection
                    title="Featured"
                    subtitle="✨ New Arrival"
                    button={false}
                >
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
