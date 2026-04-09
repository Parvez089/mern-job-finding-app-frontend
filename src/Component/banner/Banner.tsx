/** @format */
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Bell } from "lucide-react";

const Banner = () => {
  return (
    <section
      style={{
        fontFamily: "'Inter', sans-serif",
        padding: "0 24px",
        marginTop: 64,
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes bannerGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.9; }
        }
        .banner-btn-primary {
          transition: all 0.2s ease;
        }
        .banner-btn-primary:hover {
          box-shadow: 0 8px 28px rgba(49,130,206,0.5) !important;
          transform: translateY(-1px) !important;
        }
        .banner-btn-ghost {
          transition: all 0.2s ease;
        }
        .banner-btn-ghost:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(99,179,237,0.5) !important;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            padding: "52px 48px",
            background:
              "linear-gradient(135deg, #0d1b35 0%, #0f2347 50%, #0d2060 100%)",
            border: "1px solid rgba(99,179,237,0.15)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
          {/* Background glow effects */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: "15%",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(49,130,206,0.18) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "bannerGlow 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: "5%",
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          {/* Dot grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(99,179,237,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
            {/* Badge */}
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(99,179,237,0.1)",
                  border: "1px solid rgba(99,179,237,0.2)",
                  color: "#63b3ed",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                <Sparkles size={10} />
                Personalized for you
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#f0f4f8",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}>
              Find your best{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #63b3ed, #9f7aea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                opportunity
              </span>{" "}
              today
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(160,190,220,0.75)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 480,
              }}>
              Set up personalized remote job search alerts and get noticed by
              recruiters searching for your skills.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href='/auth'
                className='banner-btn-primary'
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 24px",
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(49,130,206,0.35)",
                  letterSpacing: "0.01em",
                }}>
                Start My Journey
                <ArrowRight size={15} />
              </Link>

              <Link
                href='/job'
                className='banner-btn-ghost'
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 24px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(99,179,237,0.2)",
                  color: "#a0bcdc",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}>
                <Bell size={14} />
                Explore Jobs
              </Link>
            </div>
          </div>

          {/* Decorative right side stats */}
          <div
            style={{
              position: "absolute",
              right: 48,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
            className='hidden md:flex'>
            {[
              { value: "12K+", label: "Active Jobs" },
              { value: "3.2K+", label: "Companies" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(99,179,237,0.1)",
                  borderRadius: 12,
                  padding: "12px 20px",
                  textAlign: "center",
                  minWidth: 120,
                }}>
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#f0f4f8",
                    lineHeight: 1,
                  }}>
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#4a5568",
                    marginTop: 4,
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
