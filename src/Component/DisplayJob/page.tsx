"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


interface Job {
  _id: string;
  title: string;
  position: string;
  company: string;
  city: string;
  jobType: string;
  location: string;
  rate: string;
  salary: string;
  description: string;
}

const DisplayJob = () => {
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const [jobs, setJobs] = useState<Job[]>([]);
    const router = useRouter();

    useEffect(()=>{
        axios.get(`${API_BASE_URL}/api/job`)
        .then(response => setJobs(response.data))
    },[API_BASE_URL])

     const handleClick = (id: string) => {
    // Define the behavior on button click
    router.push(`/job/${id}`)
  };
  return (
    <div className='mt-12 '>
      <ul>
        {jobs.map((job) => (
          <li
            // className='!bg-[var(--primary-light)] flex items-center gap-8 mb-4 p-4 border-l-8 border-[var(--bg-color)] rounded-br-lg shadow-md cursor-pointer'
              className="bg-[var(--primary-light)] border-l-8 mb-4 border-[var(--bg-color)] rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer hover:-translate-y-1 flex flex-col gap-3"
            key={job._id} onClick={()=>handleClick(job._id)}>
       
              <div className='relative'>
                {/* <Image src={""} alt='' /> */}
              </div>
              <div>
                <h1 className="text-lg !font-semibold text-gray-800">{job.title}</h1>
                <h4>{job.company}</h4>
                <h2>{job.location}</h2>
                <div className='flex gap-4 flex-wrap'>
                  <h2 className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md px-3 ">
                    {job.city}
                  </h2>
                  <h2 className='bg-white border rounded-sm px-4 border-gray-300 py-1'>
                    {job.position}
                  </h2>
                  <h2 className='bg-white border rounded-sm px-5 border-gray-300 py-1'>
                    {job.salary}
                  </h2>
                  <h2 className='bg-white border rounded-sm px-2 border-gray-300 py-1 w-fit'>
                    {job.jobType}
                  </h2>
                  <h2 className='bg-white border rounded-sm px-2 border-gray-300 py-1'>
                    {job.rate}
                  </h2>
                </div>
              </div>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayJob;
