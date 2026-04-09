/** @format */
"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const jobSeekerLinks = [
  { label: "Browse Jobs", href: "/job" },
  { label: "Salary Tools", href: "/salary" },
  { label: "Career Advice", href: "/advice" },
  { label: "Student Career Center", href: "/students" },
];

const employerLinks = [
  { label: "Post a Job", href: "/auth/employer/dashboard/create-job" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Help Center", href: "/help" },
];

const socialLinks = [
  { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
  { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
  { icon: <Instagram size={16} />, href: "#", label: "Instagram" },
  { icon: <Github size={16} />, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(180deg, #080d1a 0%, #060a14 100%)",
        borderTop: "1px solid #0f1929",
        marginTop: 80,
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .footer-link {
          transition: color 0.15s ease;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #63b3ed !important;
        }
        .social-icon {
          transition: all 0.18s ease;
        }
        .social-icon:hover {
          background: rgba(99,179,237,0.12) !important;
          border-color: rgba(99,179,237,0.3) !important;
          color: #63b3ed !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 0" }}>
        {/* ── Main grid ──────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px 48px",
            marginBottom: 48,
          }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#f0f4f8",
                  letterSpacing: "-0.02em",
                }}>
                Job<span style={{ color: "#63b3ed" }}>Orbit</span>
              </span>
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#2d3748",
                lineHeight: 1.75,
                marginBottom: 20,
                maxWidth: 260,
              }}>
              Discover the best remote companies worldwide. Find your dream role
              and connect with top recruiters.
            </p>

            {/* Contact chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  color: "#2d3748",
                }}>
                <MapPin size={12} color='#1a2540' />
                Remote · Worldwide
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  color: "#2d3748",
                }}>
                <Mail size={12} color='#1a2540' />
                hello@joborbit.io
              </span>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#4a5568",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              For Job Seekers
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
              {jobSeekerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className='footer-link'
                    style={{
                      fontSize: "0.85rem",
                      color: "#2d3748",
                      fontWeight: 500,
                    }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#4a5568",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              For Employers
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
              {employerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className='footer-link'
                    style={{
                      fontSize: "0.85rem",
                      color: "#2d3748",
                      fontWeight: 500,
                    }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#4a5568",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              Stay Updated
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#2d3748",
                lineHeight: 1.6,
                marginBottom: 14,
              }}>
              Get the latest job alerts delivered to your inbox.
            </p>
            <div
              style={{
                display: "flex",
                gap: 0,
                background: "rgba(15,25,45,0.8)",
                border: "1px solid #1a2540",
                borderRadius: 10,
                overflow: "hidden",
              }}>
              <input
                type='email'
                placeholder='Your email'
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e2e8f0",
                  fontSize: "0.8rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                style={{
                  padding: "9px 14px",
                  background: "rgba(49,130,206,0.2)",
                  border: "none",
                  borderLeft: "1px solid #1a2540",
                  color: "#63b3ed",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(49,130,206,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(49,130,206,0.2)";
                }}>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────── */}
        <div style={{ height: 1, background: "#0f1929", margin: "0 0 20px" }} />

        {/* ── Bottom bar ───────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            paddingBottom: 28,
          }}>
          <p style={{ fontSize: "0.75rem", color: "#1e2a3d" }}>
            © {new Date().getFullYear()} JobOrbit. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 8 }}>
            {socialLinks.map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className='social-icon'
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "rgba(15,25,45,0.8)",
                  border: "1px solid #141e33",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2d3748",
                  textDecoration: "none",
                }}>
                {icon}
              </Link>
            ))}
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <Link
                key={item}
                href='#'
                className='footer-link'
                style={{
                  fontSize: "0.72rem",
                  color: "#1e2a3d",
                  fontWeight: 500,
                }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
