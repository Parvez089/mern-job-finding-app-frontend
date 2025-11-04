'use client';

import JobDetails from "@/app/components/JobDetails";
import { getJobById } from "@/app/services/api";
import Link from "next/link";

interface JobPageProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const job = await getJobById(params.id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-red-600">Job not found.</p>
        <Link href="/job" className="text-blue-600 underline">
          Go to Job Listings →
        </Link>
      </div>
    );
  }

  return <JobDetails job={job} />;
}
