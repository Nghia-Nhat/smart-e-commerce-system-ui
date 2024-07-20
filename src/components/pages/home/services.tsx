import { ShoppingCart } from 'lucide-react';

export default function Services() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl md:leading-normal bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-gray-300">
                            Supercharge your workflow
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            The all-in-one platform for frontend teams.
                            Everything you need to go from code to global
                            deployment.
                        </p>
                    </div>
                </div>
                <div className="grid w-full grid-cols-1 items-center justify-center gap-6 md:grid-cols-3 md:gap-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full p-3 bg-gray-100 dark:bg-gray-800">
                            <ShoppingCart className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            Convenient Shopping
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            An intuitive platform that lets you focus on your
                            code.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full p-3 bg-gray-100 dark:bg-gray-800">
                            <GlobeIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold">Global Scale</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Instantly deploy your site to a global edge network.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full p-3 bg-gray-100 dark:bg-gray-800">
                            <RocketIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            Rapid Iteration
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Preview changes with every push and iterate quickly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function GlobeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function RocketIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}
