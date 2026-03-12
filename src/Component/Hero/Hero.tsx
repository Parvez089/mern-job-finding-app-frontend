<<<<<<< Updated upstream
import { Button } from "antd";
import SearchPage from "./Search";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mt-8">
      <div>
<SearchPage/>
      </div>
      
       <div className="mt-12">
        <div className="flex flex-col text-center p-2">
        <h1 className="text-4xl md:text-5xl !font-bold !m-2 text-[var(--primary-text)]">JobOrbit</h1>
          <h3 className="text-xl">Your next job starts here</h3>
          <p className="text">Create an account or sign in to see your personalized job recommendations.</p>
        </div>
        <div className="flex justify-center ">
          <Link href={"/auth"}>
 <Button className=" !items-center !text-xl py-4 w-48 !h-12 !bg-[var(--bg-color)] !text-white !font-semibold">Get Started <ArrowRightOutlined className="!font-semibold "/> </Button>
          </Link>
       
        </div>
        
          
      </div> 
=======
/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [jobInput, setJobInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  // Floating orb animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Floating dots
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Draw connections
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(14, 77, 138, ${0.07 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw dots
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > W()) dot.vx *= -1;
        if (dot.y < 0 || dot.y > H()) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 77, 138, ${dot.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const stats = [
    { icon: Briefcase, value: "12,400+", label: "Live Jobs" },
    { icon: Users, value: "3,200+", label: "Companies" },
    { icon: TrendingUp, value: "890+", label: "Hired This Month" },
  ];

  const filters = [
    "Experience",
    "Company",
    "Job Types",
    "Salary",
    "Market",
    "Benefit",
  ];

  return (
    <div className='w-full' style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Google Font import ───────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(56,189,248,0);  }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hero-fade-1 { animation: fadeUp 0.7s ease both; animation-delay: 0.1s; }
        .hero-fade-2 { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
        .hero-fade-3 { animation: fadeUp 0.7s ease both; animation-delay: 0.4s; }
        .hero-fade-4 { animation: fadeUp 0.7s ease both; animation-delay: 0.55s; }
        .hero-fade-5 { animation: fadeUp 0.7s ease both; animation-delay: 0.7s; }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #0e4d8a 0%,
            #38bdf8 30%,
            #6366f1 60%,
            #0e4d8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .filter-pill:hover {
          background: #e0f2fe !important;
          color: #0e4d8a !important;
          border-color: #bae6fd !important;
          transform: translateY(-1px);
        }
        .search-card-input:focus-within {
          background: #f0f9ff !important;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <div
        className='relative overflow-hidden'
        style={{
          background:
            "linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0f9ff 70%, #f8faff 100%)",
          minHeight: 560,
        }}>
        {/* Subtle dot-grid texture */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            backgroundImage:
              "radial-gradient(circle, #c7d9f0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.55,
          }}
        />

        {/* Large background glow blobs */}
        <div
          className='absolute pointer-events-none'
          style={{
            top: -120,
            right: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className='absolute pointer-events-none'
          style={{
            bottom: -80,
            left: "5%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Animated canvas */}
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full pointer-events-none'
          style={{ opacity: 0.8 }}
        />

        {/* Navbar */}
        <div className='relative z-20'>
          <Navbar />
        </div>

        {/* Hero Content */}
        <div
          className='relative z-10 max-w-5xl mx-auto px-6 text-center'
          style={{ paddingTop: 48, paddingBottom: 120 }}>
          {/* Badge */}
          <div className='hero-fade-1 flex justify-center mb-7'>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #0e4d8a 0%, #1e6bb8 100%)",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(14,77,138,0.25)",
                animation: "badgePulse 2.5s ease-in-out infinite",
              }}>
              <Zap size={11} fill='#fff' />
              Now Hiring · 890 new jobs this week
            </span>
          </div>

          {/* Headline */}
          <div className='hero-fade-2'>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: "#0f172a",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 0,
              }}>
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
              }}>
              <span className='shimmer-text'>Dream Career</span>
            </h1>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: "#0f172a",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 0,
              }}>
              in Seconds
            </h1>
          </div>

          {/* Subtext */}
          <p
            className='hero-fade-3'
            style={{
              marginTop: 20,
              color: "#64748b",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            Discover remote and hybrid opportunities at world-class companies.
            Your next career move starts here.
          </p>

          {/* Stats */}
          <div
            className='hero-fade-4'
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
              marginTop: 32,
              flexWrap: "wrap",
            }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background:
                      "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(14,77,138,0.1)",
                  }}>
                  <Icon size={16} color='#0e4d8a' />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#0f172a",
                      lineHeight: 1,
                    }}>
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      lineHeight: 1,
                      marginTop: 2,
                    }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FLOATING SEARCH CARD ─────────────── */}
      <div
        className='hero-fade-5'
        style={{
          position: "relative",
          zIndex: 30,
          maxWidth: 900,
          margin: "-72px auto 0",
          padding: "0 16px",
        }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            boxShadow:
              "0 24px 80px rgba(14,77,138,0.14), 0 4px 20px rgba(14,77,138,0.08)",
            border: "1px solid rgba(14,77,138,0.08)",
            overflow: "hidden",
          }}>
          {/* Search inputs row */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Job input */}
            <div
              className='search-card-input'
              style={{
                flex: 1,
                minWidth: 200,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 22px",
                borderRight: "1px solid #f1f5f9",
                transition: "background 0.2s",
              }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #0e4d8a, #1e6bb8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                <Search size={15} color='#fff' />
              </div>
              <Input
                bordered={false}
                placeholder='Job title, keywords, or company'
                value={jobInput}
                onChange={(e) => setJobInput(e.target.value)}
                style={{
                  padding: 0,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#0f172a",
                  boxShadow: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* Location input */}
            <div
              className='search-card-input'
              style={{
                flex: 1,
                minWidth: 200,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 22px",
                transition: "background 0.2s",
              }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #6366f1, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                <MapPin size={15} color='#fff' />
              </div>
              <Input
                bordered={false}
                placeholder="City, state, or 'remote'"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                style={{
                  padding: 0,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#0f172a",
                  boxShadow: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                style={{
                  flexShrink: 0,
                  padding: "10px 24px",
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #0e4d8a 0%, #1e6bb8 100%)",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(14,77,138,0.35)",
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(14,77,138,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(14,77,138,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                Search
              </button>
            </div>
          </div>

          {/* Filter pills row */}
          <div
            style={{
              borderTop: "1px solid #f1f5f9",
              background: "#fafcff",
              padding: "12px 22px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginRight: 4,
              }}>
              Filter
            </span>
            {filters.map((f) => (
              <button
                key={f}
                className='filter-pill'
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "5px 13px",
                  borderRadius: 999,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  color: "#475569",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {f}
                <DownOutlined style={{ fontSize: 8, opacity: 0.6 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: 40 }} />
>>>>>>> Stashed changes
    </div>
  );
};

export default Hero;
