import Footer from '@/components/partials/footer';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className='min-h-[100vh]'>{children}</main>
            <Footer />
        </>
    );
}
