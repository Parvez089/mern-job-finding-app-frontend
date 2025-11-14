/** @format */

"use client";
import { useState } from "react";


import HeroText from "./HeroText";
import SearchPage from "./Search";

import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import SelectFilter from "./SelectFilter";

const Hero = () => {
  const router = useRouter();

  return (
    <div className=''>
      <div className='bg-[var(--bg-primary)] h-[400px] sm:h-[450px]'>
        <Navbar />
        <HeroText />
      </div>
      <div className='relative -translate-y-20'>
        <SearchPage />
        <SelectFilter />
      </div>
      
    </div>
  );
};

export default Hero;
