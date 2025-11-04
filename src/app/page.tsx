/** @format */
"use client";

import Hero from "@/Component/Hero/Hero";

import { useRouter } from "next/navigation";
import { useState } from "react";
import JobLayout from "./job/layout";

export default function Home() {
   const router = useRouter();

   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

   const handleJobSelect = (id: string) => {
     setSelectedJobId(id);
     router.push(`/job/${id}`);
   };
  return (
    <div className=''>
   
    {/* <JobLayout/> */}
    </div>
  );
}
