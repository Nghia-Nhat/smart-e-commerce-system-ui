import Footer from "@/components/partials/footer";
import NavbarMobile from "@/components/partials/navbar-mobile";
import Navbar from "@/components/partials/navbar";
import ScrollToTop from "@/components/partials/scroll-to-top";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main className="h-fit min-h-[90vh]">{children}</main>

      {/* Some utils */}
      <ScrollToTop />
      <NavbarMobile />
      <Footer />
    </>
  );
}
