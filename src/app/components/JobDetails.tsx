"use client"

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  description: string;
}

export default function JobDetails({ job }: { job: Job }) {
  return (
    <div className="w-2/3 p-6">
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-1">{job.company}</p>
      <p className="text-gray-500 mb-4">{job.city}</p>
      <p className="text-gray-600">{job.description}</p>
    </div>
  );
}
