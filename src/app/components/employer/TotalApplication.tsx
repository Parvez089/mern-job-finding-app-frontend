/** @format */

"use client";
import React from "react";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  isUp?: boolean;
  isDown?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentage,
  isUp,
  isDown,
}) => {
  // ট্রেন্ড অনুযায়ী কালার এবং আইকন নির্ধারণ
  const isNeutral = !isUp && !isDown;

  const statusColor = isUp
    ? "text-[#22c55e]"
    : isDown
    ? "text-[#ef4444]"
    : "text-[#64748b]";
  const bgColor = isUp
    ? "bg-[#f0fdf4]"
    : isDown
    ? "bg-[#fef2f2]"
    : "bg-[#f8fafc]";
  const borderColor = isUp
    ? "border-[#dcfce7]"
    : isDown
    ? "border-[#fee2e2]"
    : "border-[#e2e8f0]";

  return (
    <div className='bg-white p-6 rounded-[24px] border border-[#e8e8f3] shadow-sm w-full transition-all hover:shadow-md'>
      {/* Header Section */}
      <div className='flex justify-between items-start mb-4'>
        <h3 className='text-[#505495] text-lg font-medium tracking-tight'>
          {title}
        </h3>

        <div
          className={`flex items-center gap-1 ${bgColor} px-3 py-1 rounded-full border ${borderColor}`}>
          {isUp && (
            <ArrowUpOutlined className={`${statusColor} text-xs font-bold`} />
          )}
          {isDown && (
            <ArrowDownOutlined className={`${statusColor} text-xs font-bold`} />
          )}
          {isNeutral && (
            <MinusOutlined className={`${statusColor} text-xs font-bold`} />
          )}

          <span className={`${statusColor} text-sm font-bold`}>
            {percentage}
          </span>
        </div>
      </div>

      {/* Value Section */}
      <div className='mb-6'>
        <p className='text-[#0e0f1b] text-4xl font-extrabold tracking-tight'>
          {value}
        </p>
      </div>

      {/* Mini Bar Chart Section (Static for UI) */}
      <div className='flex items-end gap-2 h-16 w-full'>
        <div className='flex-1 bg-[#4850e515] rounded-md h-[30%]'></div>
        <div className='flex-1 bg-[#4850e520] rounded-md h-[45%]'></div>
        <div className='flex-1 bg-[#4850e525] rounded-md h-[55%]'></div>
        <div className='flex-1 bg-[#4850e530] rounded-md h-[40%]'></div>
        <div className='flex-1 bg-[#4850e540] rounded-md h-[75%]'></div>
        <div className='flex-1 bg-[#4850e5] rounded-md h-[95%] shadow-sm shadow-indigo-100'></div>
      </div>
    </div>
  );
};

export default StatsCard;
