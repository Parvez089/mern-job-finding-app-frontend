"use client"

import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center px-6'>
      <div className='max-w-md w-full text-center'>
        <div className='flex justify-center mb-6'>
          <div className='p-6 bg-white rounded-full shadow-sm border border-gray-100'>
            <FileQuestion size={64} className='text-red-400' />
          </div>
        </div>

        <h1 className='text-9xl font-black text-red-700 opacity-10'>404</h1>
        <div className='-mt-12 relative'>
          <h2 className='text-3xl font-bold text-red-400 mb-3'>
            Page Not Found
          </h2>
          <p className='text-gray-500 mb-8'>
            {
              "Oops! The page you are looking for doesn't exist or has been moved. Please check the URL or return to the dashboard."
            }
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 bg-[#4850e5] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3a41c4] transition-all shadow-lg shadow-indigo-100'>
            <Home size={18} />
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className='flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all'>
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <p className='mt-12 text-sm text-gray-400'>
          If you believe this is a technical error, please contact support at
          <span className='text-[#4850e5] ml-1'>support@joborbit.com</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
