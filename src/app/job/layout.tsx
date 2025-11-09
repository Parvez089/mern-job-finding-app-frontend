/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";
import JobList from "../components/JobList";

interface JobLayoutProps {
  children: React.ReactNode;
  onSelectJob?: (id: string) => void;
}
const JobLayout = ({ children, onSelectJob }: JobLayoutProps) => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <div className='hidden w-full gap-8 max-w-7xl mx-auto'>
        <div className='w-full !max-w-lg '>
          <JobList jobs={jobs} onSelectJob={onSelectJob} />
        </div>
        <div className='w-full'>{children}</div>
      </div>
      <div className='md:flex w-full gap-8 max-w-7xl mx-auto'>
        <div className='w-full !max-w-lg '>
          <JobList jobs={jobs} onSelectJob={onSelectJob} />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};

export default JobLayout;
