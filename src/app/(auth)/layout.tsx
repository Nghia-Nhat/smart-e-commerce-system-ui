import Footer from '@/components/partials/footer';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className='min-h-[100vh] flex items-center'>{children}</main>
            <Footer />
        </>
    );
}
