/** @format */
"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Search, MapPin, Briefcase, Users, TrendingUp, Zap } from "lucide-react";
import Navbar from "../Navbar/Navbar";

const Hero = () => {
  const [jobInput, setJobInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const stats = [
    { icon: Briefcase,  value: "12,400+", label: "Live Jobs"        },
    { icon: Users,      value: "3,200+",  label: "Companies"        },
    { icon: TrendingUp, value: "890+",    label: "Hired This Month" },
  ];

  const filters = ["Experience", "Company", "Job Types", "Salary", "Market", "Benefit"];

  return (
    <div className="w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hf1 { animation: fadeUp 0.6s ease both 0.1s; }
        .hf2 { animation: fadeUp 0.6s ease both 0.2s; }
        .hf3 { animation: fadeUp 0.6s ease both 0.3s; }
        .hf4 { animation: fadeUp 0.6s ease both 0.4s; }
        .hf5 { animation: fadeUp 0.6s ease both 0.5s; }

        .filter-pill:hover {
          background: #e8f4fd !important;
          color: #0077b6 !important;
          border-color: #90caf9 !important;
        }
        .search-input:focus-within { background: #f0f7ff !important; }
        .search-btn:hover {
          background: #005f8e !important;
          box-shadow: 0 6px 20px rgba(0,119,182,0.4) !important;
        }
      `}</style>

      {/* ── Hero ─────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 50%, #f5f0ff 100%)",
          minHeight: 520,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #bfdbfe 1px, transparent 1px)",
          backgroundSize: "30px 30px", opacity: 0.4,
        }} />

        {/* Glow accents */}
        <div style={{
          position: "absolute", top: -80, right: -60,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        {/* Navbar */}
        <div style={{ position: "relative", zIndex: 20 }}>
          <Navbar />
        </div>

        {/* Content */}
        <div style={{
          maxWidth: 900, margin: "0 auto",
          padding: "48px 24px 120px",
          textAlign: "center", position: "relative", zIndex: 10,
        }}>
          {/* Badge */}
          <div className="hf1" style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 999,
              background: "#fff", border: "1px solid #e0e7ff",
              color: "#4f46e5", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <Zap size={10} fill="#4f46e5" color="#4f46e5" />
              890 new jobs this week
            </span>
          </div>

          {/* Headline */}
          <div className="hf2">
            <h1 style={{
              fontSize: "clamp(2.2rem, 6vw, 3rem)",
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: "-0.03em", color: "#0f172a",
              marginBottom: 0,
            }}>
               Find Your Dream Career
            </h1>
            <h1 style={{
              fontSize: "clamp(2.2rem, 6vw, 3rem)",
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: "-0.03em", marginBottom: 0,
              background: "linear-gradient(90deg, #0077b6, #4f46e5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              in Seconds
            </h1>
          </div>

          {/* Subtext */}
          <p className="hf3" style={{
            marginTop: 16, color: "#64748b",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7, maxWidth: 480,
            marginLeft: "auto", marginRight: "auto",
          }}>
            Discover remote and hybrid opportunities at world-class companies.
            Your next career move starts here.
          </p>

          {/* Stats */}
          <div className="hf4" style={{
            display: "flex", justifyContent: "center",
            gap: 28, marginTop: 28, flexWrap: "wrap",
          }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: "#fff", border: "1px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  <Icon size={15} color="#0077b6" />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a", lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8", lineHeight: 1, marginTop: 2 }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search Card ──────────────────── */}
      <div className="hf5" style={{
        position: "relative", zIndex: 30,
        maxWidth: 860, margin: "-68px auto 0",
        padding: "0 16px",
      }}>
        <div style={{
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Job input */}
            <div className="search-input" style={{
              flex: 1, minWidth: 200,
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 20px",
              borderRight: "1px solid #f1f5f9",
              transition: "background 0.2s",
            }}>
              <Search size={18} color="#0077b6" strokeWidth={2.5} />
              <Input bordered={false}
                placeholder="Job title, keywords, or company"
                value={jobInput}
                onChange={(e) => setJobInput(e.target.value)}
                style={{ padding: 0, fontSize: "0.9rem", fontWeight: 500, color: "#0f172a", boxShadow: "none" }}
              />
            </div>

            {/* Location input */}
            <div className="search-input" style={{
              flex: 1, minWidth: 200,
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 20px",
              transition: "background 0.2s",
            }}>
              <MapPin size={18} color="#4f46e5" strokeWidth={2.5} />
              <Input bordered={false}
                placeholder="City, state, or 'remote'"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                style={{ padding: 0, fontSize: "0.9rem", fontWeight: 500, color: "#0f172a", boxShadow: "none" }}
              />
              <button className="search-btn" style={{
                flexShrink: 0, padding: "9px 22px", borderRadius: 10,
                background: "#0077b6", border: "none", color: "#fff",
                fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,119,182,0.3)",
                transition: "all 0.2s ease",
              }}>
                Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            borderTop: "1px solid #f8fafc",
            background: "#fafbfc",
            padding: "10px 20px",
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6,
          }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 4 }}>
              Filter
            </span>
            {filters.map((f) => (
              <button key={f} className="filter-pill" style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                padding: "4px 11px", borderRadius: 999,
                background: "#f1f5f9", border: "1px solid #e2e8f0",
                color: "#64748b", fontSize: "0.78rem", fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s ease",
              }}>
                {f} <DownOutlined style={{ fontSize: 8, opacity: 0.5 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
};

export default Hero;