/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { getJobById } from "../services/api";
import { useRouter } from "next/navigation";
import { MapPin, Building2, Briefcase, DollarSign, Bookmark, Share2, ArrowRight, Loader2 } from "lucide-react";

interface Job {
  _id: string; title: string; company: string; city: string;
  position: string; jobType: string; location: string; salary: string;
  description: string; details: string; responsibilities: string;
}

const JobDetails = ({ jobId }: { jobId?: string }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!jobId) return;
    setLoading(true); setJob(null);
    const fetchJob = async () => {
      const data = await getJobById(jobId);
      setJob(data); setLoading(false);
    };
    fetchJob();
  }, [jobId]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 240, background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0" }}>
      <Loader2 size={22} color="#0077b6" className="animate-spin" />
    </div>
  );

  if (!job) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 240, background: "#f8fafc", borderRadius: 16, border: "1px dashed #e2e8f0" }}>
      <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Select a job to see details</p>
    </div>
  );

  const tags = [
    { icon: Building2, text: job.company,             bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    { icon: MapPin,    text: job.city || job.location, bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
    { icon: Briefcase, text: job.jobType,              bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    { icon: DollarSign,text: job.salary,               bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  ].filter(t => t.text);

  const sections = [
    { title: "Full Job Description", content: job.description,     accent: "#0077b6" },
    { title: "Responsibilities",     content: job.responsibilities, accent: "#7c3aed" },
    { title: "Additional Details",   content: job.details,          accent: "#15803d" },
  ].filter(s => s.content);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <style>{`
        .jd-scroll::-webkit-scrollbar { width: 4px; }
        .jd-scroll::-webkit-scrollbar-track { background: #f8fafc; }
        .jd-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .apply-btn:hover { background: #005f8e !important; box-shadow: 0 6px 20px rgba(0,119,182,0.35) !important; transform: translateY(-1px) !important; }
        .icon-btn:hover { background: #eff6ff !important; border-color: #93c5fd !important; color: #0077b6 !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #f1f5f9", padding: "24px 24px 20px" }}>
        <h2 style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12 }}>
          {job.title}
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {tags.map(({ icon: Icon, text, bg, color, border }) => (
            <span key={text} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 6,
              background: bg, border: `1px solid ${border}`,
              color, fontSize: "0.75rem", fontWeight: 600,
            }}>
              <Icon size={11} /> {text}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="apply-btn" onClick={() => router.push(`/job/apply-job?jobId=${jobId}`)} style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "9px 20px", borderRadius: 9,
            background: "#0077b6", border: "none", color: "#fff",
            fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,119,182,0.25)",
            transition: "all 0.18s ease",
          }}>
            Apply Now <ArrowRight size={14} />
          </button>

          {[<Bookmark size={15} />, <Share2 size={15} />].map((icon, i) => (
            <button key={i} className="icon-btn" style={{
              width: 38, height: 38, borderRadius: 8,
              background: "#f8fafc", border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#94a3b8", cursor: "pointer", transition: "all 0.15s ease",
            }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="jd-scroll" style={{ background: "#fafbfc", overflowY: "auto", maxHeight: 480, padding: "20px 24px 28px" }}>
        {sections.map((s) => (
          <section key={s.title} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: s.accent, flexShrink: 0 }} />
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{s.title}</h3>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#64748b", textAlign: "justify" }}>
              {s.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;