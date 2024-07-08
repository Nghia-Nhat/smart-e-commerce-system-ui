import Footer from '@/components/partials/footer';
import NavbarMobile from '@/components/partials/navbar-mobile';
import ChatBot from '@/components/partials/chat/chatbot';
import Navbar from '@/components/partials/navbar';
import SortBar from '@/components/pages/shop/sort-bar';
import SearchFilter from '@/components/pages/shop/search-filter';
import ScrollToTop from '@/components/partials/scroll-to-top';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-5">
                <SearchFilter/>
                <section className="col-span-5 md:col-span-4">
                    <SortBar />
                    <main className="h-fit min-h-[90vh]">{children}</main>
                </section>
            </div>

            {/* Some utils */}
            <ScrollToTop/>
            <NavbarMobile />
            <Footer />
        </>
    );
}
