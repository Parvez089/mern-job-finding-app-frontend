/** @format */

"use client";
import { useState } from "react";
import JobFilter from "../DisplayJob/filter";
import DisplayJob from "../DisplayJob/page";
import HeroText from "./HeroText";
import SearchPage from "./Search";

const Hero = () => {

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    country: "",
    salary: "",
    skills: "",
  })

  const handleFilterChange = (field: string, value: string) =>{
    setFilters((prev) => ({...prev, [field]: value}))
  }

  const handleClear = ()=>{
    setFilters({
       search: "",
    category: "",
    country: "",
    salary: "",
    skills: ""
    
    })
  };

    const handleApply = () => {
    console.log("Applied filters:", filters);
  };
  return (
    <div className='mt-8'>
      <SearchPage />
      <HeroText />
      <div className='border-b border-gray-400 mt-12'></div>
      <div className='hidden md:grid grid-cols-12 gap-4 content-center container max-w-7xl px-4 mx-auto '>
        <div className='col-start-1 col-end-8'>
          <DisplayJob />
        </div>
        <div className='col-start-8 col-end-12 '>
          <JobFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClear}
            onApply={handleApply}/>
        </div>
      </div>
      <div className='md:hidden flex flex-col content-center container max-w-7xl px-4 mx-auto '>
        <div className='col-start-8 col-end-12 overflow-hidden'>
          <JobFilter 
           filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClear}
            onApply={handleApply}
          />
        </div>
        <div className='col-start-1 col-end-8'>
          <DisplayJob />
        </div>
      </div>
    </div>
  );
};

export default Hero;
