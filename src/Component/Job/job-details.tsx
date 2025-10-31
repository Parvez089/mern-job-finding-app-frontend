/** @format */

"use client";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  position: string;
  company: string;
  city: string;
  category: string;
  jobType: string;
  location: string;
  rate: string;
  salary: string;
  description: string;
  responsibilities: string;
  details: string;
  qualifications: string;
  createdAt: string;
}

const JobDetails = () => {
  const { id } = useParams();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/job/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    if (id) fetchJob();
  }, [id, API_BASE_URL]);

  const getHoursAgo = (createdAt: string) => {
    const createdTime = new Date(createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - createdTime.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  };

  if (!job) {
    return <div className='text-center py-10'>Loading job details...</div>;
  }

  return (
    <div>
      <div className='border border-gray-300 w-full px-4 py-8'>
        <h2 className='text-2xl !font-semibold'>{job.company}</h2>
        <Link href={"/"} className='text-red-400 text-sm'>
          View company <ArrowRightOutlined />
        </Link>
        <p className="text-sm">Job posted: 2</p>
      </div>

      <div className='border border-gray-300 w-full mt-4 px-4 py-4'>
        <h1 className='text-md !font-semibold bg-[var(--primary-light)] w-26 '>
          About the job
        </h1>
        <div className='flex justify-between gap-24 text-md mt-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 '>
              <small className='font-semibold'>Posted on</small>
              <small className=''>{getHoursAgo(job.createdAt)}</small>
            </div>

            <div className='flex flex-col gap-1'>
              <small className='font-semibold'>Job type</small>
              <small className='bg-[var(--primary-light)] w-fit px-2 py-1'>
                {job.jobType}
              </small>
            </div>
            <div className='flex flex-col gap-1'>
              <small className='font-semibold'>Category</small>
              <small>{job.category}</small>
            </div>
            <div className='flex flex-col gap-1'>
              <small className='font-semibold'>Region</small>
              <small className='bg-[var(--primary-text)] w-fit px-2 py-1 text-gray-100'>
                {job.city}
              </small>
            </div>
          </div>
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col gap-1'>
              <small>Apply before</small>
              <small className='w-fit text-[var(--primary-text)]'></small>
            </div>
            <div className='flex flex-col gap-1'>
              <small>Salary</small>
              <small className='w-fit text-[var(--primary-text)]'>
                {job.salary}
              </small>
            </div>
          </div>
        </div>
        <Button
          size='large'
          className='w-full !mt-8 !py-2 border-none !bg-[var(--primary-text)] !text-gray-50 !font-semibold'>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
