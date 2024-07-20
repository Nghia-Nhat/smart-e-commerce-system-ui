import Footer from '@/components/partials/footer';
import Navbar from '@/components/partials/navbar';
import NavbarMobile from '@/components/partials/navbar-mobile';
import ScrollToTop from '@/components/partials/scroll-to-top';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-[100vh] flex justify-center">
                {children}
            </main>
            <ScrollToTop />
            <NavbarMobile />
            <Footer />
        </>
    );
}
