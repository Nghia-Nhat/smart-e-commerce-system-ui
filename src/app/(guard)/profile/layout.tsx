import Footer from "@/components/partials/footer";
import Navbar from "@/components/partials/navbar";
import NavbarMobile from "@/components/partials/navbar-mobile";
import ScrollToTop from "@/components/partials/scroll-to-top";
import Link from "next/link";
import { Home, Menu, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] flex justify-center">
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex-1 md:pt-10">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Package className="h-5 w-5" />
                    Orders
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="flex flex-col"
                  aria-describedby={undefined}
                >
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="/profile"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/orders"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Orders
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </main>
      <ScrollToTop />
      <NavbarMobile />
      <Footer />
    </>
  );
}
