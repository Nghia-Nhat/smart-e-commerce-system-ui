import Footer from '@/components/partials/footer';
import Link from 'next/link';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="p-4 border-b h-[10vh]">
                <div className="max-w-8xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-black md:ml-5">
                        <Link href="/">Triplee 🛒</Link>
                    </div>
                </div>
            </div>
            <main className="h-fit min-h-[90vh] pt-10">{children}</main>
            <Footer />
        </>
    );
}
