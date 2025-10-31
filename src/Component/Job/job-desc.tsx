/** @format */

"use client";


import { Button } from "antd";
import axios from "axios";

import { useParams, useRouter,  } from "next/navigation";
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
const JobDesc = () => {
  const { id } = useParams();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        axios
          .get(`${API_BASE_URL}/api/job/${id}`)
          .then((res) => setJob(res.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, API_BASE_URL]);


  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;
  const handleApply = () =>{
    router.push("/job/job-apply")
  }
  return (
    <div className='flex justify-center '>
      <div className='w-full max-w-5xl'>
        <h1 className='text-3xl font-bold'>{job.title}</h1>

        <p>{job.location}</p>
        <div className='mt-4'>
          <p> {job.description}</p>
          <Button onClick={handleApply} className=' !mt-8 py-2 !border-none focus:!text-none !bg-[var(--primary-text)] !text-gray-50 !font-semibold'>
            Apply Now
          </Button>
        </div>
        

        </div>
  
    </div>
  );
};

export default JobDesc;
