'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
}

export default function JobList({ jobs }: { jobs: Job[] }) {

  const pathname = usePathname();
  return (
    <div className="w-full border-r border-gray-200 p-4  h-screen">
      <h2 className="text-xl font-semibold mb-3">Available Jobs</h2>
      {jobs.map((job) => {       
        
        const isActive = pathname === `/job/${job._id}`;

        return(
 <Link
          href={`/job/${job._id}`}
          key={job._id}
          className={`block p-3 mb-2 rounded-md transition ${
              isActive ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
        >
          <h3 className="font-medium">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
          <p className="text-xs text-gray-500">{job.city}</p>
        </Link>
        )}

 
       
      )}
    </div>
  );
}
