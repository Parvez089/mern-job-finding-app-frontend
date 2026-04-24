"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Hero from "./Hero";
import { useJobContext } from "@/context/JobContext";

const ConditionalHero = () => {
  const { setSearchResults } = useJobContext();
  const pathname = usePathname();
  const router = useRouter();

  const showHero =
    pathname === "/" ||
    (pathname.startsWith("/job") && pathname !== "/job/apply-job");

  if (!showHero) return null;

  const handleSearch = (jobs: any[], pagination: any) => {
    console.log("Context updated with:", jobs.length, "jobs");
    setSearchResults(jobs);

    // ✅ Navigate to /job so JobList renders and shows results
    // router.replace ensures we land on /job base route
    // which triggers JobList's auto-select for first search result
    if (pathname !== "/job") {
      router.push("/job");
    }
  };

  return (
    <Hero
      onSearch={handleSearch}
      setLoading={(loading: boolean) => {
        console.log("Search loading status:", loading);
      }}
    />
  );
};

export default ConditionalHero;