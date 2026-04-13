/** @format */
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Bell, Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <section style={{ padding: "0 20px", marginTop: 64, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          position: "relative", borderRadius: 20, overflow: "hidden",
          padding: "52px 48px",
          background: "linear-gradient(135deg, #0077b6 0%, #023e8a 60%, #4f46e5 100%)",
          boxShadow: "0 20px 60px rgba(0,119,182,0.25)",
        }}>
          {/* Dot grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          {/* Glow */}
          <div style={{
            position: "absolute", top: -60, right: "10%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 580 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                <Sparkles size={9} /> Personalized for you
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Find your best opportunity today
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>
              Set up personalized remote job search alerts and get noticed by recruiters searching for your skills.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/auth" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "11px 22px", borderRadius: 10,
                background: "#fff", color: "#0077b6",
                fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                transition: "all 0.18s ease",
              }}>
                Start My Journey <ArrowRight size={14} />
              </Link>
              <Link href="/job" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "11px 22px", borderRadius: 10,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff", fontSize: "0.9rem", fontWeight: 600,
                textDecoration: "none",
              }}>
                <Bell size={14} /> Explore Jobs
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            position: "absolute", right: 48, top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 10,
          }} className="hidden md:flex">
            {[{ value: "12K+", label: "Active Jobs" }, { value: "3.2K+", label: "Companies" }, { value: "98%", label: "Satisfaction" }].map(({ value, label }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12, padding: "12px 20px", textAlign: "center", minWidth: 110,
              }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;