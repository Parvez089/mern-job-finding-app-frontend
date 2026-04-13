/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";
import JobList from "../components/JobList";
import { usePathname } from "next/navigation";
import { Pagination } from "antd";

interface Job { _id: string; title: string; company: string; city: string; location: string; }
interface JobLayoutProps { children: React.ReactNode; }

const PAGE_SIZE = 12;

const JobLayout = ({ children }: JobLayoutProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs(page, PAGE_SIZE);
      setJobs(data?.jobs || []);
      setTotalPages(data?.pagination?.totalPages || 1);
    };
    fetchJobs();
  }, [page]);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isApplyPage = pathname === "/job/apply-job";
  const hideForSmallDevice = isMobile && pathname.startsWith("/job/small-device/");
  const showJobList = !isApplyPage && !hideForSmallDevice;
  const hasJobSelected = pathname.startsWith("/job/") && pathname !== "/job" && !isApplyPage && !pathname.startsWith("/job/small-device");

  if (isApplyPage) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", justifyContent: "center", alignItems: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 720 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px", display: "flex", gap: 20, alignItems: "flex-start" }}>

        {/* Left: Job list */}
        {showJobList && (
          <div style={{ width: 320, flexShrink: 0, position: "sticky", top: 20 }}>
            <div style={{
              background: "#ffffff", borderRadius: 14,
              border: "1px solid #e2e8f0", padding: "16px 14px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              maxHeight: "calc(100vh - 80px)", overflowY: "auto",
            }}>
              <JobList jobs={jobs} />
              <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
                <Pagination current={page} total={totalPages * PAGE_SIZE} pageSize={PAGE_SIZE} onChange={(p) => setPage(p)} size="small" />
              </div>
            </div>
          </div>
        )}

        {/* Right: Job detail */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {hasJobSelected ? children : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 320, background: "#fff", borderRadius: 14, border: "1px dashed #e2e8f0" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Select a job to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobLayout;