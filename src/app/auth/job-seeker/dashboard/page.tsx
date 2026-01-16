/** @format */

import JobSeekerStats from "@/app/components/job-seeker/Dashboard/JobSeekerStats";
import RecentActivity from "@/app/components/job-seeker/Dashboard/RecentActivity";
import RecommendedJobs from "@/app/components/job-seeker/Dashboard/RecommendedJobs";
import React from "react";

const page = () => {
  return (
    <div>
      <JobSeekerStats />
      <div className='lg:flex   lg:flex-1 gap-8 mt-8'>
        <RecentActivity />
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default page;
