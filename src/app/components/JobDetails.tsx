/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { getJobById } from "../services/api";
import { Button } from "antd";
import { LinkOutlined, SaveFilled, SaveOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  position: string;
  jobType: string;
  location: string;
  salary: string;
  description: string;
  details: string;
  responsibilities: string;
}

interface JobDetailsProps {
  jobId: string;
}
const JobDetails = ({ jobId }: JobDetailsProps) => {
  const [job, setJobs] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(jobId);
      setJobs(data);
    };
    fetchJob();
  }, [jobId]);

  const handleApply = () =>{
    router.push("/job/apply-job");
  }

  if (!job) return <p>Loading job details...</p>;
  return (
    <div className='border !border-gray-300 !bg-[var(--card-color)] rounded-lg '>
      <div className='flex flex-col gap-3 !bg-[var(--card-color)] px-4 py-8 shadow-b-3xl border-b border-gray-300 rounded-lg '>
        <div>
          <h2 className='text-xl hover:underline !font-semibold'>
            {job.title}
          </h2>
          <h2>{job.company}</h2>
          <h2>{job.location}</h2>

          <div>
            <p>{job.salary}   — {job.jobType}</p>
            
          </div>
        </div>

        <div className='flex gap-6 '>
          <Button onClick={handleApply} className='!bg-[var(--bg-color)] text-xl !text-[var(--text-color)]'>
            Apply Now
          </Button>
          <SaveOutlined className='bg-blue-100 text-lg p-2 rounded-4xl' />
          <LinkOutlined className='bg-blue-100 text-lg p-2 rounded-4xl' />
        </div>
      </div>
      <div className='!bg-[var(--card-color)] overflow-scroll overflow-x-auto max-h-[700px]'>
        <div className='mt-8 px-4 flex flex-col gap-4 !bg-[var(--card-color)] '>
          {
            job.description &&(
         <div>
            <h1 className='text-xl !font-semibold'>Full job description</h1>
            <h2 className='text-justify text-base/6 text-gray-600 list-disc'>
              {job.description}
            </h2>
          </div>

            )
          }
          {
            job.responsibilities &&(
        <div>
            <h1 className='text-lg !font-semibold'>Job Responsibilities</h1>
            <h2 className='text-justify text-base/6 text-gray-600 list-disc'>
              {job.responsibilities}
            </h2>
          </div>

            )
          }
          
         {
          job.details && (
             <div>
            <h1 className='text-lg !font-semibold'>Job Responsibilities</h1>
            <h2 className='text-justify text-base/6 text-gray-600 list-disc'>
              {job.details}
            </h2>
          </div>
          )

          
         }
         
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
