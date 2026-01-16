
"use client"
import FilterBar from "@/app/components/employer/JobPostings/FilterBar";
import JobRow from "@/app/components/employer/JobPostings/JobRow";
import JobTable from "@/app/components/employer/JobPostings/JobTable";
import PageHeader from "@/app/components/employer/JobPostings/PageHeader";
import React from "react";

const JobPost = () => {
  const handleCrateJob =() =>{
    console.log("Opening Crate Job Modal...")
  }
  return (
  <div className="max-w[1400px] mx-auto px-6 md:p-10">
    <PageHeader 
      title="Job Postings"
      subtitle="Manage and track all your recruitment openings"
      onActionClick={handleCrateJob}
    />
 
    <JobTable/>
  </div>
  );
};

export default JobPost;
