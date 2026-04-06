import React from "react";
import Image from 'next/image';
import Link from 'next/link';
const Banner = () => {
  return <section className="relative px-4 mt-16 sm:px-6 lg:px-8">
      {/* Container that provides the "overlap" */}
      <div className="max-w-7xl mx-auto -mb-32 relative z-10"> 
        <div className="bg-[#0e82c1] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          
          {/* Text Content */}
          <div className="flex-1 text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Find your best opportunity today
            </h2>
            <p className="text-blue-100 text-lg max-w-md">
              Set up personalized remote job search alerts and get noticed by recruiters searching for your skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition">
                Start My journey
              </Link>
              <Link href="/explore" className="border border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition">
                Explore More
              </Link>
            </div>
          </div>

          {/* Image Content */}
          {/* <div className="flex-1 relative w-full aspect-video md:aspect-auto">
            <Image 
              src="" // Add your image to /public
              alt="Person working on laptop"
              width={500}
              height={300}
              className="rounded-2xl object-cover"
            />
          </div> */}
        </div>
      </div>
    </section>;
};

export default Banner;
