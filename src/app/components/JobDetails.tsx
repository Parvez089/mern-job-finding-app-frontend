/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { getJobById } from "../services/api";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Building2,
  Briefcase,
  Bookmark,
  Share2,
  ArrowRight,
  Loader2,
  DollarSign,
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  position: string;
  jobType: string;
  location: string;
  salary: string;
  description: string;
  details: string;
  responsibilities: string;
}

interface JobDetailsProps {
  jobId?: string;
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!jobId) return;
    setLoading(true);
    setJob(null);
    const fetchJob = async () => {
      const data = await getJobById(jobId);
      setJob(data);
      setLoading(false);
    };
    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    router.push(`/job/apply-job?jobId=${jobId}`);
  };

  const placeholder = (message: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 240,
        background: "rgba(16,24,40,0.6)",
        borderRadius: 16,
        border: "1px dashed #1a2540",
      }}>
      <p
        style={{
          color: "#2d3748",
          fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif",
        }}>
        {message}
      </p>
    </div>
  );

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 240,
          borderRadius: 16,
          background: "rgba(16,24,40,0.6)",
          border: "1px solid #1a2540",
        }}>
        <Loader2 size={22} color='#63b3ed' className='animate-spin' />
      </div>
    );

  if (!job) return placeholder("Select a job to see details");

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #1a2540",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .jd-apply:hover {
          box-shadow: 0 6px 24px rgba(49,130,206,0.45) !important;
          transform: translateY(-1px) !important;
        }
        .jd-icon-btn:hover {
          border-color: rgba(99,179,237,0.4) !important;
          color: #63b3ed !important;
        }
        .jd-scroll::-webkit-scrollbar { width: 3px; }
        .jd-scroll::-webkit-scrollbar-track { background: transparent; }
        .jd-scroll::-webkit-scrollbar-thumb {
          background: #1e2a3d;
          border-radius: 3px;
        }
      `}</style>

      {/* ── Header ───────────────────────────── */}
      <div
        style={{
          background: "rgba(16,24,40,0.95)",
          borderBottom: "1px solid #1a2540",
          padding: "24px 24px 20px",
        }}>
        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
            fontWeight: 700,
            color: "#f0f4f8",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            marginBottom: 12,
          }}>
          {job.title}
        </h2>

        {/* Meta pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 18,
          }}>
          {job.company && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 6,
                background: "rgba(99,179,237,0.08)",
                border: "1px solid rgba(99,179,237,0.15)",
                color: "#63b3ed",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}>
              <Building2 size={11} /> {job.company}
            </span>
          )}
          {(job.city || job.location) && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 6,
                background: "rgba(154,108,255,0.08)",
                border: "1px solid rgba(154,108,255,0.15)",
                color: "#9f7aea",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}>
              <MapPin size={11} /> {job.city || job.location}
            </span>
          )}
          {job.jobType && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 6,
                background: "rgba(72,187,120,0.08)",
                border: "1px solid rgba(72,187,120,0.15)",
                color: "#68d391",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}>
              <Briefcase size={11} /> {job.jobType}
            </span>
          )}
          {job.salary && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 6,
                background: "rgba(237,187,64,0.08)",
                border: "1px solid rgba(237,187,64,0.15)",
                color: "#ecc94b",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}>
              <DollarSign size={11} /> {job.salary}
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className='jd-apply'
            onClick={handleApply}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 20px",
              borderRadius: 9,
              background: "linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)",
              border: "none",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(49,130,206,0.3)",
              transition: "all 0.18s ease",
              letterSpacing: "0.01em",
            }}>
            Apply Now <ArrowRight size={14} />
          </button>

          {[<Bookmark size={14} />, <Share2 size={14} />].map((icon, i) => (
            <button
              key={i}
              className='jd-icon-btn'
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "transparent",
                border: "1px solid #1e2a3d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2d3748",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────── */}
      <div
        className='jd-scroll'
        style={{
          background: "rgba(13,20,35,0.95)",
          overflowY: "auto",
          maxHeight: 480,
          padding: "20px 24px 28px",
        }}>
        {[
          {
            title: "Full Job Description",
            content: job.description,
            color: "#63b3ed",
          },
          {
            title: "Responsibilities",
            content: job.responsibilities,
            color: "#9f7aea",
          },
          {
            title: "Additional Details",
            content: job.details,
            color: "#68d391",
          },
        ]
          .filter((s) => s.content)
          .map((section) => (
            <section key={section.title} style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}>
                <div
                  style={{
                    width: 3,
                    height: 14,
                    borderRadius: 2,
                    background: section.color,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#cbd5e0",
                    letterSpacing: "0.01em",
                  }}>
                  {section.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.8,
                  color: "#4a5568",
                  textAlign: "justify",
                }}>
                {section.content}
              </p>
            </section>
          ))}
      </div>
    </div>
  );
};

export default JobDetails;
