/** @format */
"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, MapPin, Mail, ArrowUpRight } from "lucide-react";

const jobSeekerLinks = [
  { label: "Browse Jobs",           href: "/job"      },
  { label: "Salary Tools",          href: "/salary"   },
  { label: "Career Advice",         href: "/advice"   },
  { label: "Student Career Center", href: "/students" },
];

const employerLinks = [
  { label: "Post a Job",  href: "/auth/employer/dashboard/create-job" },
  { label: "Solutions",   href: "/solutions" },
  { label: "Pricing",     href: "/pricing"   },
  { label: "Resources",   href: "/resources" },
  { label: "Help Center", href: "/help"      },
];

const socialLinks = [
  { icon: <Twitter size={15} />,   href: "#", label: "Twitter"   },
  { icon: <Linkedin size={15} />,  href: "#", label: "LinkedIn"  },
  { icon: <Instagram size={15} />, href: "#", label: "Instagram" },
  { icon: <Github size={15} />,    href: "#", label: "GitHub"    },
];

const Footer = () => {
  return (
    <footer style={{ fontFamily: "'Inter', sans-serif", background: "#fff", borderTop: "1px solid #f1f5f9", marginTop: 80 }}>
      <style>{`
        .ft-link { transition: color 0.15s ease; text-decoration: none; }
        .ft-link:hover { color: #0077b6 !important; }
        .ft-social { transition: all 0.15s ease; }
        .ft-social:hover { background: #eff6ff !important; border-color: #93c5fd !important; color: #0077b6 !important; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px 48px", marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", display: "block", marginBottom: 12 }}>
              Job<span style={{ color: "#0077b6" }}>Orbit</span>
            </span>
            <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: 16, maxWidth: 240 }}>
              Discover the best remote companies worldwide. Find your dream role and connect with top recruiters.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { icon: <MapPin size={11} color="#cbd5e1" />, text: "Remote · Worldwide" },
                { icon: <Mail size={11} color="#cbd5e1" />,   text: "hello@joborbit.io"  },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#94a3b8" }}>
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>For Job Seekers</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {jobSeekerLinks.map(({ label, href }) => (
                <li key={label}><Link href={href} className="ft-link" style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>For Employers</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {employerLinks.map(({ label, href }) => (
                <li key={label}><Link href={href} className="ft-link" style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Stay Updated</h3>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: 12 }}>
              Get the latest job alerts delivered to your inbox.
            </p>
            <div style={{ display: "flex", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, padding: "9px 12px", background: "transparent", border: "none", outline: "none", color: "#0f172a", fontSize: "0.8rem", fontFamily: "'Inter', sans-serif" }} />
              <button style={{ padding: "9px 12px", background: "#0077b6", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.15s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#005f8e"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#0077b6"; }}
              >
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "#f1f5f9" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, padding: "20px 0 24px" }}>
          <p style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
            © {new Date().getFullYear()} JobOrbit. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            {socialLinks.map(({ icon, href, label }) => (
              <Link key={label} href={href} aria-label={label} className="ft-social" style={{ width: 32, height: 32, borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", textDecoration: "none" }}>
                {icon}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <Link key={item} href="#" className="ft-link" style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 500 }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;