/** @format */

"use client";


import axios from "axios";

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
const JobRequirement = () => {
  const { id } = useParams();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, [id,API_BASE_URL]);


  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div >
  
        <div className='grid grid-cols-12 gap-2 mt-8'>
          <div className='grid col-start-1 col-end-8 w-full'>
            <div className="flex flex-col gap-4 ">
              <h1>{job.description}</h1>
              <h1>{job.responsibilities}</h1>
              <h1>{job.qualifications}</h1>
              <h1>{job.details}</h1>
            </div>
          </div>

      </div>
    </div>
  );
};

export default JobRequirement;
