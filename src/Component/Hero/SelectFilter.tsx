/** @format */
"use client";

import React from "react";
import { DownOutlined } from "@ant-design/icons";

const filters = [
  "Experience", "Company", "Job Types", "Salary", "Market", "Benefit",
];

const SelectFilter = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
      <style>{`
        .filter-pill-dark {
          transition: all 0.18s ease !important;
        }
        .filter-pill-dark:hover {
          background: rgba(56,189,248,0.15) !important;
          color: #38bdf8 !important;
          border-color: rgba(56,189,248,0.35) !important;
          transform: translateY(-1px) !important;
        }
      `}</style>

      <div
        style={{
          background: "rgba(13,25,50,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "0 0 20px 20px",
          border: "1px solid rgba(56,189,248,0.12)",
          borderTop: "1px solid rgba(56,189,248,0.06)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "rgba(148,197,255,0.45)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginRight: 4,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Filter
        </span>

        {filters.map((f) => (
          <button
            key={f}
            className="filter-pill-dark"
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "5px 13px", borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(56,189,248,0.15)",
              color: "rgba(186,230,253,0.7)",
              fontSize: "0.8rem", fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {f}
            <DownOutlined style={{ fontSize: 8, opacity: 0.5 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectFilter;