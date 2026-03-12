/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";
import JobList from "../components/JobList";
import { usePathname } from "next/navigation";
import { Pagination } from "antd";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  location: string;
}

interface JobLayoutProps {
  children: React.ReactNode;
}

const PAGE_SIZE = 12;

const JobLayout = ({ children }: JobLayoutProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const pathname = usePathname();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs(page, PAGE_SIZE);
      setJobs(data?.jobs || []);
      setTotalPages(data?.pagination?.totalPages || 1);
    };
    fetchJobs();
  }, [page]);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isApplyPage = pathname === "/job/apply-job";
  const hideForSmallDevice =
    isMobile && pathname.startsWith("/job/small-device/");
  const showJobList = !isApplyPage && !hideForSmallDevice;

  // A specific job is selected when URL is /job/[id]
  const hasJobSelected =
    pathname.startsWith("/job/") &&
    pathname !== "/job" &&
    !isApplyPage &&
    !pathname.startsWith("/job/small-device");

  if (isApplyPage) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4'>
        <div className='w-full max-w-3xl'>{children}</div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 w-full'>
      {showJobList && (
        <div className='w-full md:w-1/3 !max-w-lg'>
          <JobList jobs={jobs} />
          <div className='mt-4 flex justify-center'>
            <Pagination
              current={page}
              total={totalPages * PAGE_SIZE}
              pageSize={PAGE_SIZE}
              onChange={(p) => setPage(p)}
            />
          </div>
        </div>
      )}

      {/* Right panel */}
      <div className='w-full md:w-2/3'>
        {hasJobSelected ? (
          children
        ) : (
          <div className='flex items-center justify-center h-64 border border-dashed border-gray-300 rounded-lg'>
            <p className='text-gray-400 text-base'>
              Select a job to see details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobLayout;
