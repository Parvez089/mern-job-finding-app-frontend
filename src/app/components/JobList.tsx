/** @format */
"use client";

import { Bookmark, MapPin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  location: string;
}

interface JobListProps {
  jobs: Job[];
  onSelectJob?: (id: string) => void;
}

const JobList = ({ jobs = [], onSelectJob }: JobListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const hasAutoSelected = useRef(false);

  useEffect(() => {
    if (hasAutoSelected.current) return;
    if (jobs.length === 0) return;
    if (pathname !== "/job") return;
    hasAutoSelected.current = true;
    const firstJobId = jobs[0]._id;
    const isMobile = window.innerWidth < 768;
    if (isMobile) router.replace(`/job/small-device/${firstJobId}`);
    else router.replace(`/job/${firstJobId}`);
    if (onSelectJob) onSelectJob(firstJobId);
  }, [jobs, pathname, router, onSelectJob]);

  const handleJobClick = (id: string) => {
    if (onSelectJob) onSelectJob(id);
    const isMobile = window.innerWidth < 768;
    if (isMobile) router.push(`/job/small-device/${id}`);
    else router.push(`/job/${id}`);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .jl-card { transition: all 0.15s ease; cursor: pointer; }
        .jl-card:hover {
          border-color: #93c5fd !important;
          box-shadow: 0 4px 16px rgba(0,119,182,0.08) !important;
          transform: translateY(-1px);
        }
        .jl-card.active {
          border-color: #0077b6 !important;
          background: #f0f7ff !important;
        }
        .jl-save { transition: all 0.15s ease; }
        .jl-save:hover { background: #e8f4fd !important; color: #0077b6 !important; border-color: #93c5fd !important; }
      `}</style>

      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
          Available Jobs
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
          {jobs.length} positions found
        </p>
      </div>

      {jobs.length === 0 && (
        <div style={{ padding: 32, textAlign: "center", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No jobs found</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {jobs.map((job) => {
          const isActive = pathname === `/job/${job._id}`;
          return (
            <div key={job._id} onClick={() => handleJobClick(job._id)}
              className={`jl-card ${isActive ? "active" : ""}`}
              style={{
                background: isActive ? "#f0f7ff" : "#ffffff",
                border: `1px solid ${isActive ? "#0077b6" : "#e2e8f0"}`,
                borderRadius: 12, padding: "12px 14px",
                boxShadow: isActive ? "0 2px 12px rgba(0,119,182,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f172a", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#0077b6", fontWeight: 600, marginBottom: 6 }}>
                    {job.company}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={10} color="#94a3b8" />
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      {job.city || job.location}
                    </span>
                    {isActive && (
                      <span style={{
                        marginLeft: 6, fontSize: "0.6rem", fontWeight: 700,
                        color: "#0077b6", background: "#dbeafe",
                        padding: "1px 6px", borderRadius: 999,
                        textTransform: "uppercase", letterSpacing: "0.05em",
                      }}>
                        Viewing
                      </span>
                    )}
                  </div>
                </div>

                <button className="jl-save" onClick={(e) => e.stopPropagation()} style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#cbd5e1", cursor: "pointer", flexShrink: 0, marginLeft: 8,
                }}>
                  <Bookmark size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;