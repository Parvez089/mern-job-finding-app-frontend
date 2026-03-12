/** @format */

"use client";

import React, { useEffect, useState } from "react";
import JobList from "../components/JobList";
import JobDetails from "../components/JobDetails";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  location: string;
}

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
        const data = await res.json();
        setJobs(data.data || data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-gray-400 text-lg'>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className='flex gap-6 p-6'>
      {/* Left: Job List */}
      <div className='w-full md:w-1/3 overflow-y-auto max-h-[80vh]'>
        <JobList jobs={jobs} />
      </div>

      {/* Right: Job Details (desktop only) */}
      <div className='hidden md:block w-2/3'>
        <JobDetails />
      </div>
    </div>
  );
};

export default JobPage;
