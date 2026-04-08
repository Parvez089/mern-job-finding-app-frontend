/** @format */
"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { Search, MapPin } from "lucide-react";

const SearchPage = () => {
  const [jobInput, setJobInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  return (
    <div
      className="hero-fade-5"
      style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}
    >
      <style>{`
        .search-input-wrap:focus-within {
          background: rgba(56,189,248,0.04) !important;
        }
        .search-input-wrap .ant-input {
          background: transparent !important;
          color: #f1f5f9 !important;
        }
        .search-input-wrap .ant-input::placeholder {
          color: rgba(148,197,255,0.45) !important;
        }
      `}</style>

      <div
        style={{
          background: "rgba(13,25,50,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "20px 20px 0 0",
          border: "1px solid rgba(56,189,248,0.12)",
          borderBottom: "none",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>

          {/* Job title */}
          <div
            className="search-input-wrap"
            style={{
              flex: 1, minWidth: 200,
              display: "flex", alignItems: "center", gap: 12,
              padding: "18px 22px",
              borderRight: "1px solid rgba(56,189,248,0.08)",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #0e4d8a, #1e6bb8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(14,77,138,0.4)",
              }}
            >
              <Search size={15} color="#fff" />
            </div>
            <Input
              bordered={false}
              placeholder="Job title, keywords, or company"
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              style={{
                padding: 0, fontSize: "0.95rem", fontWeight: 500,
                color: "#f1f5f9", boxShadow: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent",
              }}
            />
          </div>

          {/* Location + Search button */}
          <div
            className="search-input-wrap"
            style={{
              flex: 1, minWidth: 200,
              display: "flex", alignItems: "center", gap: 12,
              padding: "18px 22px",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
              }}
            >
              <MapPin size={15} color="#fff" />
            </div>
            <Input
              bordered={false}
              placeholder="City, state, or 'remote'"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              style={{
                padding: 0, fontSize: "0.95rem", fontWeight: 500,
                color: "#f1f5f9", boxShadow: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent",
              }}
            />
            <button
              style={{
                flexShrink: 0,
                padding: "10px 24px", borderRadius: 12,
                background: "linear-gradient(135deg, #0e4d8a 0%, #1e6bb8 100%)",
                border: "1px solid rgba(56,189,248,0.3)",
                color: "#ffffff",
                fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(14,77,138,0.5)",
                transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,77,138,0.7)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,77,138,0.5)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;