/** @format */
"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock data based on your image
const data = [
  { name: "Jan", count: 400 },
  { name: "Feb", count: 600 },
  { name: "Mar", count: 900 },
  { name: "Apr", count: 1200 },
  { name: "May", count: 1000 },
  { name: "Jun", count: 1500 },
];

const HiringTrendsChart = () => {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className='bg-white p-8 rounded-[24px] border border-[#e8e8f3] shadow-sm w-full'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-10'>
        <div>
          <p className='text-[#505495] text-sm font-medium'>Hiring Activity</p>
          <h3 className='text-[#0e0f1b] text-2xl font-bold'>Monthly Trends</h3>
        </div>

        {/* Toggle Buttons */}
        <div className='flex bg-[#f6f6f8] p-1 rounded-xl'>
          <button
            onClick={() => setTimeRange("6months")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              timeRange === "6months"
                ? "bg-[#4850e515] text-[#4850e5] shadow-sm"
                : "text-[#505495] hover:text-[#4850e5]"
            }`}>
            Last 6 Months
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              timeRange === "year"
                ? "bg-[#4850e515] text-[#4850e5] shadow-sm"
                : "text-[#505495] hover:text-[#4850e5]"
            }`}>
            Last Year
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className='h-[300px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray='3 3'
              stroke='#f1f1f4'
            />
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#505495", fontSize: 12, fontWeight: 600 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#505495", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#4850e508" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey='count'
              radius={[6, 6, 0, 0]} // Rounded top corners
              barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  // The last bar is solid, others are semi-transparent as per your design
                  fill={index === data.length - 1 ? "#4850e5" : "#4850e530"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HiringTrendsChart;
