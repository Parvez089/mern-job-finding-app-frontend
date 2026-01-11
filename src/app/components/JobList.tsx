/** @format */

"use client";
import { SaveOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  location: string;
}

interface JobListProps {
  jobs: Job[];
  onSelectJob?: (id: string) => void;
}

const JobList = ({ jobs = [], onSelectJob }: JobListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // if(!isMobile && jobs.length > 0 && pathname === "/job")

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (jobs.length > 0 && pathname === "/job") {
      const firstJobId = jobs[0]._id;
      console.log(jobs.length, "Total Job")
      // If desktop → stay in layout view
      if (!isMobile) {
        router.replace(`/job/${firstJobId}`);
      } else {
        // If mobile → go to small device route
        router.replace(`/job/small-device/${firstJobId}`);
      }

      // Callback for parent if exists
      if (onSelectJob) onSelectJob(firstJobId);

      console.log("✅ Default selected job:", firstJobId);
    }
  }, [jobs, pathname, router, onSelectJob, isMobile]);


  const handleJobClick = (id: string) => {
    if (onSelectJob) onSelectJob(id);

    if (isMobile) {
      router.push(`/job/small-device/${id}`);
    } else {
      router.push(`/job/${id}`);
    }

    console.log("Navigating to job: ", id);
  };

  return (
    <div>
      <h2 className='text-2xl !font-bold --font-poppins'>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p> }
     
      <div className='space-y-3 '>
        {jobs.map((job) => {
          const isActive = pathname === `/job/${job._id}`;

          return (
            <div
              key={job._id}
              onClick={() => handleJobClick(job._id)}
              className={`border p-3 rounded-4xl cursor-pointer transition 
               !bg-[var(--card-color)] ${
                 isActive ? "!border-blue-500" : "border-gray-200"
               }`}>
              <div className='flex justify-between !m-2'>
                <div className='--font-poppins'>
                  <h3 className='text-xl !font-semibold'>{job.title}</h3>
                  <p>{job.company}</p>
                </div>

                <div className='text-lg h-6'>
                  <SaveOutlined className='bg-blue-200  p-2 rounded-4xl' />
                </div>
              </div>
              <div className='text-gray-500 m-2'>
                <h2>{job.city}</h2>
                <h2>{job.location}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
