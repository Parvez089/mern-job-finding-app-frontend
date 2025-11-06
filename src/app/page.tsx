// app/page.tsx 

'use client';
import { useState } from "react";
import JobLayout from "./job/layout";
import JobDetails from "./components/JobDetails";

export default function Home() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  return (
    <div>
  

      <JobLayout onSelectJob={setSelectedJobId}>
        {selectedJobId ? (
          <JobDetails jobId={selectedJobId} />
        ) : (
          <div className="p-4 text-gray-500">Select a job to see details</div>
        )}
      </JobLayout>
    </div>
  );
}
