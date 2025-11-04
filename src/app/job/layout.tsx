'use client';

import { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";
import JobList from "../components/JobList";


export default function JobLayout({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      console.log(data, "data is")
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex w-full max-w-7xl justify-center mx-auto">
      <div className="w-full">
        <h1>Recommendation Job</h1>
 <JobList jobs={jobs} />
      </div>
     
      <div className="w-full">{children}</div>
      hello
    </div>
  );
}
