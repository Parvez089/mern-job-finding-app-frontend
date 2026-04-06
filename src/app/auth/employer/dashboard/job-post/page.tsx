
"use client"
import FilterBar from "@/app/components/employer/JobPostings/FilterBar";
import JobRow from "@/app/components/employer/JobPostings/JobRow";
import JobTable from "@/app/components/employer/JobPostings/JobTable";
import PageHeader from "@/app/components/employer/JobPostings/PageHeader";
import { useRouter } from "next/navigation";
import React from "react";

const JobPost = () => {
  const router = useRouter();
  const handleCrateJob = () => {
    router.push("/auth/employer/dashboard/create-job");
    console.log("clicked");
  };
  return (
    <div className='max-w[1400px] mx-auto px-6 md:p-10'>
      <PageHeader
        title='Job Postings'
        subtitle='Manage and track all your recruitment openings'
        onActionClick={handleCrateJob}
      />

      <JobTable />
    </div>
  );
};

export default JobPost;
