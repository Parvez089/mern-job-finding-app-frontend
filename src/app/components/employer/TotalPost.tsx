/** @format */
"use client";
import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  percentage: string;
  isUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, isUp = true }) => {
  return (
    <div className="bg-[#FFFFFF] p-6 rounded-[24px] border border-[#e8e8f3] shadow-sm w-full transition-all hover:shadow-md">
      {/* Header: Title and Trend Badge */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[#505495] text-lg font-medium tracking-tight">
          {title}
        </h3>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
          isUp ? "bg-[#f0fdf4] border-[#dcfce7]" : "bg-red-50 border-red-100"
        }`}>
          {isUp ? (
            <ArrowUpOutlined className="text-[#22c55e] text-xs font-bold" />
          ) : (
            <ArrowDownOutlined className="text-red-500 text-xs font-bold" />
          )}
          <span className={`text-sm font-bold ${isUp ? "text-[#22c55e]" : "text-red-500"}`}>
            {percentage}
          </span>
        </div>
      </div>

      {/* Main Value */}
      <div className="mb-6">
        <p className="text-[#0e0f1b] text-4xl font-extrabold tracking-tight">
          {value === "..." ? "..." : Number(value).toLocaleString()}
        </p>
      </div>

      {/* Visual Mini Chart (Static bars matching your design) */}
      <div className="flex items-end gap-2 h-16 w-full px-1">
        <div className="flex-1 bg-[#4850e515] rounded-md h-[30%]"></div>
        <div className="flex-1 bg-[#4850e515] rounded-md h-[45%]"></div>
        <div className="flex-1 bg-[#4850e525] rounded-md h-[60%]"></div>
        <div className="flex-1 bg-[#4850e515] rounded-md h-[40%]"></div>
        <div className="flex-1 bg-[#4850e540] rounded-md h-[75%]"></div>
        <div className="flex-1 bg-[#4850e5] rounded-md h-[95%] shadow-md shadow-indigo-100"></div>
      </div>
    </div>
  );
};

export default StatsCard;