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
    if (isMobile) {
      router.replace(`/job/small-device/${firstJobId}`);
    } else {
      router.replace(`/job/${firstJobId}`);
    }
    if (onSelectJob) onSelectJob(firstJobId);
  }, [jobs, pathname, router, onSelectJob]);

  const handleJobClick = (id: string) => {
    if (onSelectJob) onSelectJob(id);
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      router.push(`/job/small-device/${id}`);
    } else {
      router.push(`/job/${id}`);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .jl-card {
          transition: all 0.18s ease;
          cursor: pointer;
        }
        .jl-card:hover {
          border-color: rgba(99,179,237,0.35) !important;
          background: rgba(30,42,64,0.9) !important;
          transform: translateY(-1px);
        }
        .jl-card.active {
          border-color: rgba(99,179,237,0.55) !important;
          background: rgba(30,48,75,0.95) !important;
        }
        .jl-save:hover {
          color: #63b3ed !important;
          border-color: rgba(99,179,237,0.4) !important;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#e2e8f0",
            letterSpacing: "-0.01em",
            marginBottom: 2,
          }}>
          Available Jobs
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#4a5568" }}>
          {jobs.length} positions
        </p>
      </div>

      {jobs.length === 0 && (
        <div
          style={{
            padding: "40px 16px",
            textAlign: "center",
            background: "rgba(20,28,45,0.6)",
            borderRadius: 12,
            border: "1px solid #1e2a3d",
          }}>
          <p style={{ color: "#4a5568", fontSize: "0.85rem" }}>No jobs found</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {jobs.map((job) => {
          const isActive = pathname === `/job/${job._id}`;
          return (
            <div
              key={job._id}
              onClick={() => handleJobClick(job._id)}
              className={`jl-card ${isActive ? "active" : ""}`}
              style={{
                background: isActive
                  ? "rgba(30,48,75,0.95)"
                  : "rgba(20,30,48,0.7)",
                border: `1px solid ${isActive ? "rgba(99,179,237,0.5)" : "#1a2540"}`,
                borderRadius: 12,
                padding: "12px 14px",
                boxShadow: isActive
                  ? "0 0 0 1px rgba(99,179,237,0.15), 0 4px 16px rgba(0,0,0,0.2)"
                  : "none",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                      marginBottom: 2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "#63b3ed",
                      fontWeight: 500,
                      marginBottom: 6,
                    }}>
                    {job.company}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={10} color='#4a5568' />
                    <span style={{ fontSize: "0.72rem", color: "#4a5568" }}>
                      {job.city || job.location}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          color: "#63b3ed",
                          background: "rgba(99,179,237,0.1)",
                          border: "1px solid rgba(99,179,237,0.2)",
                          padding: "1px 6px",
                          borderRadius: 999,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}>
                        Viewing
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className='jl-save'
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: "transparent",
                    border: "1px solid #1e2a3d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2d3748",
                    cursor: "pointer",
                    flexShrink: 0,
                    marginLeft: 8,
                    transition: "all 0.15s ease",
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
