/** @format */
"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import HeroText from "./HeroText";
import SearchPage from "./Search";
import SelectFilter from "./SelectFilter";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(14,77,138,${0.07 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > W()) dot.vx *= -1;
        if (dot.y < 0 || dot.y > H()) dot.vy *= -1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,77,138,${dot.alpha})`;
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

  return (
    <div className="w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-1 { animation: fadeUp 0.7s ease both; animation-delay: 0.1s; }
        .hero-fade-2 { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
        .hero-fade-3 { animation: fadeUp 0.7s ease both; animation-delay: 0.4s; }
        .hero-fade-4 { animation: fadeUp 0.7s ease both; animation-delay: 0.55s; }
        .hero-fade-5 { animation: fadeUp 0.7s ease both; animation-delay: 0.7s; }
      `}</style>

      {/* ── Hero background ───────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0f9ff 70%, #f8faff 100%)",
          minHeight: 560,
        }}
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c7d9f0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.55,
          }}
        />

        {/* Glow blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -120, right: -100, width: 600, height: 600,
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -80, left: "5%", width: 500, height: 500,
            background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.8 }}
        />

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Hero text + stats */}
        <div className="relative z-10">
          <HeroText />
        </div>
      </div>

      {/* Search card + filters floating below hero */}
      <div className="relative z-30" style={{ marginTop: -72 }}>
        <SearchPage />
        <SelectFilter />
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
};

export default Hero;