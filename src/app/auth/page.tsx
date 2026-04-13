"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Building2, ArrowRight } from "lucide-react";

const AuthRoute = () => {
  const [selected, setSelected] = useState<"jobseeker" | "employer" | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    if (selected === "jobseeker") router.push("/auth/job-seeker/register");
    else router.push("/auth/employer/register");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0f7ff 0%, #f5f0ff 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .role-card { transition: all 0.18s ease; cursor: pointer; }
        .role-card:hover { border-color: #93c5fd !important; background: #f0f7ff !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,119,182,0.1) !important; }
        .role-card.active { border-color: #0077b6 !important; background: #eff6ff !important; box-shadow: 0 4px 20px rgba(0,119,182,0.15) !important; }
        .continue-btn { transition: all 0.18s ease; cursor: pointer; }
        .continue-btn:hover:not(:disabled) { box-shadow: 0 8px 24px rgba(0,119,182,0.35) !important; transform: translateY(-1px) !important; }
        .continue-btn:disabled { opacity: 0.45 !important; cursor: not-allowed !important; }
      `}</style>

      {/* Background blobs */}
      <div style={{ position: "fixed", top: -80, right: -60, width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -60, left: -40, width: 350, height: 350, background: "radial-gradient(circle, rgba(0,119,182,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, background: "#ffffff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9", position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
            Job<span style={{ color: "#0077b6" }}>Orbit</span>
          </span>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
            Join JobOrbit
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
            Choose how you want to use JobOrbit
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {[
            { key: "jobseeker" as const, icon: Briefcase, title: "Find Jobs & Sign Up", desc: "Create your profile to start applying." },
            { key: "employer"  as const, icon: Building2, title: "Hire Talent & Sign Up", desc: "Post a job and find top talent." },
          ].map(({ key, icon: Icon, title, desc }) => (
            <div key={key} onClick={() => setSelected(key)}
              className={`role-card ${selected === key ? "active" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", borderRadius: 12,
                background: selected === key ? "#eff6ff" : "#f8fafc",
                border: `1.5px solid ${selected === key ? "#0077b6" : "#e2e8f0"}`,
                boxShadow: selected === key ? "0 4px 20px rgba(0,119,182,0.12)" : "none",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: selected === key ? "#dbeafe" : "#f1f5f9",
                border: `1px solid ${selected === key ? "#93c5fd" : "#e2e8f0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.18s ease",
              }}>
                <Icon size={18} color={selected === key ? "#0077b6" : "#94a3b8"} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: selected === key ? "#0f172a" : "#64748b", marginBottom: 2, transition: "color 0.18s" }}>
                  {title}
                </div>
                <div style={{ fontSize: "0.78rem", color: selected === key ? "#64748b" : "#94a3b8", transition: "color 0.18s" }}>
                  {desc}
                </div>
              </div>
              {selected === key && (
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#0077b6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue button */}
        <button className="continue-btn" onClick={handleContinue} disabled={!selected} style={{
          width: "100%", padding: "12px",
          borderRadius: 11,
          background: selected ? "#0077b6" : "#f1f5f9",
          border: "none",
          color: selected ? "#fff" : "#94a3b8",
          fontSize: "0.95rem", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: selected ? "0 4px 14px rgba(0,119,182,0.25)" : "none",
          transition: "all 0.18s ease",
        }}>
          Continue {selected && <ArrowRight size={16} />}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          <span style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
        </div>

        {/* Login link */}
        <p style={{ textAlign: "center", fontSize: "0.83rem", color: "#94a3b8" }}>
          Already have an account?{" "}
          <Link href="/auth/job-seeker/login" style={{ color: "#0077b6", fontWeight: 700, textDecoration: "none" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRoute;