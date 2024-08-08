"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-50 text-gray-900 items-center justify-center">
      <h1 className="text-8xl font-bold">Error</h1>
      <p className="text-4xl font-medium">Unexpected error occurred</p>
      <Link href="/" className="mt-4 text-xl text-blue-600 hover:underline">
        GO BACK HOME
      </Link>
    </div>
  );
};

export default ErrorPage;
