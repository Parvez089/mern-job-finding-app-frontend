/** @format */

import JobDetails from "@/app/components/JobDetails";

// app/job/[id]/page.tsx

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // ✅ await params before using
  const { id } = await params;

  return <JobDetails jobId={id} />;
}
