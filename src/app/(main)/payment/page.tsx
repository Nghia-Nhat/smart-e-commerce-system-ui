"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WrapSection } from "@/components/utils/wrap-section";
import FlashSaleSection from "@/components/pages/home/flash-sale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageNotFound from "@/components/pages/error/product-not-found";
import Image from "next/image";

const Payment = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const method = searchParams.get("method");
  const router = useRouter();
  if (!method && (!success || !canceled)) {
    router.replace("/");
  }

  return (
    <>
      {!success && !canceled && (
        <div className="flex h-[50vh] md:h-[90vh] justify-center items-center">
          <Image
            src="/images/404.png"
            width={500}
            height={500}
            alt="Product not found"
            draggable="false"
            className="select-none"
          />
        </div>
      )}
      {success && <SuccessComponent />}
      {canceled && <CanceledComponent />}

      <WrapSection
        background={false}
        title="Today's"
        subtitle="⚡Flash Sales"
        button={false}
        countdown={false}
      >
        <div className="flex flex-wrap max-w-screen gap-5 md:ml-10 py-2">
          <FlashSaleSection />
        </div>
      </WrapSection>
    </>
  );
};

export default Payment;

export function SuccessComponent() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
        <CircleCheckIcon className="h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold">Payment Successful</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Thank you for your purchase!
        </p>
        <div className="mt-6 border rounded-lg p-4 w-full max-w-md">
          <div className="flex justify-between text-sm">
            <span>Amount Paid:</span>
            <span className="font-medium">$100.00</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Date & Time:</span>
            <span className="font-medium">January 22, 2024, 10:30 AM</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Reference Number:</span>
            <span className="font-medium">1234567890</span>
          </div>
        </div>
        <div className="flex flex-col">
          <Link
            href="/orders"
            className="mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            prefetch={false}
          >
            Check your order
          </Link>
          <Link
            href="/"
            className="mt-2 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            prefetch={false}
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}

export function CanceledComponent() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
        <CancelIcon className="h-20 w-20" />
        <h1 className="mt-4 text-2xl font-semibold">Payment Canceled</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Continue to shopping!
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          prefetch={false}
        >
          Return to Homepage
        </Link>
      </main>
    </div>
  );
}

function CircleCheckIcon(props: any) {
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
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CancelIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#f44336"
        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
      ></path>
      <path
        fill="#fff"
        d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
      ></path>
      <path
        fill="#fff"
        d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
      ></path>
    </svg>
  );
}
