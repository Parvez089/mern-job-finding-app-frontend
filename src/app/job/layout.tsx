/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";
import JobList from "../components/JobList";
import { usePathname } from "next/navigation";
import { Pagination } from "antd";

interface JobLayoutProps {
  children: React.ReactNode;
  onSelectJob?: (id: string) => void;
}

const PAGE_SIZE = 12;

const JobLayout = ({ children, onSelectJob }: JobLayoutProps) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages]= useState(1);


  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs(page,PAGE_SIZE);
      setJobs(data.jobs);
      setTotalPages(data.pagination.totalPages)
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
  // Decide whether to show JobList
  const hideForSmallDevice = isMobile && pathname.startsWith("/job/small-device/");
  const showJobList = !isApplyPage && !hideForSmallDevice;


  if(isApplyPage){
    return(
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 w-full">
      {showJobList && (
        <div className="w-full md:w-1/3 !max-w-lg">
          <JobList jobs={jobs} onSelectJob={onSelectJob} />
          <div className="mt-4 flex justify-center">
            <Pagination
            current={page}
            total={totalPages * 12}
            pageSize={12}
            onChange={(p)=>setPage(p)}
            />

          
          </div>
          
        </div>
      )}
      <div className="w-full md:w-2/3">{children}</div>
    </div>
  );
};

export default JobLayout;
