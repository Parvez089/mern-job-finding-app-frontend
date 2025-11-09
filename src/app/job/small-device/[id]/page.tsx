/** @format */
"use client"
import { useParams } from "next/navigation";
import SmallDeviceJob from "../components/page";

export default function SmallDeviceJobPage() {
  const params = useParams();
  const jobId = params.id; // This is your dynamic route param

    if (!jobId || Array.isArray(jobId)) {
      return <p>Invalid Job ID</p>;
    }
  return <SmallDeviceJob jobId={jobId} />;
}
