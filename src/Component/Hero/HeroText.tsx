/** @format */
"use client";

import React from "react";
import { Briefcase, Users, TrendingUp, Zap } from "lucide-react";

const stats = [
  { icon: Briefcase,  value: "12,400+", label: "Live Jobs"        },
  { icon: Users,      value: "3,200+",  label: "Companies"        },
  { icon: TrendingUp, value: "890+",    label: "Hired This Month" },
];

const HeroText = () => {
  return (
    <div
      className="max-w-5xl mx-auto px-6 text-center"
      style={{ paddingTop: 56, paddingBottom: 130 }}
    >
      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.35); }
          50%       { box-shadow: 0 0 0 10px rgba(56,189,248,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #38bdf8 0%, #818cf8 35%, #34d399 65%, #38bdf8 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Badge */}
      <div className="hero-fade-1 flex justify-center mb-7">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            borderRadius: 999,
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.25)",
            color: "#7dd3fc",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            animation: "badgePulse 2.5s ease-in-out infinite",
            backdropFilter: "blur(8px)",
          }}
        >
          <Zap size={11} fill="#38bdf8" color="#38bdf8" />
          Now Hiring · 890 new jobs this week
        </span>
      </div>

      {/* Headline */}
      <div className="hero-fade-2">
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#ffffff",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 0,
            textShadow: "0 2px 40px rgba(56,189,248,0.1)",
          }}
        >
          Find Your
        </h1>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 0,
          }}
        >
          <span className="shimmer-text">Dream Career</span>
        </h1>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#ffffff",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 0,
            textShadow: "0 2px 40px rgba(56,189,248,0.1)",
          }}
        >
          in Seconds
        </h1>
      </div>

      {/* Subtext */}
      <p
        className="hero-fade-3"
        style={{
          marginTop: 20,
          color: "rgba(186,230,253,0.7)",
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          lineHeight: 1.75,
          maxWidth: 520,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Discover remote and hybrid opportunities at world-class companies.
        Your next career move starts here.
      </p>

      {/* Stats */}
      <div
        className="hero-fade-4"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          marginTop: 36,
          flexWrap: "wrap",
        }}
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 38, height: 38,
                borderRadius: 10,
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={17} color="#38bdf8" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontWeight: 800, fontSize: "1rem",
                  color: "#ffffff", lineHeight: 1,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(148,197,255,0.6)",
                  lineHeight: 1, marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroText;