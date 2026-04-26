/** @format */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Radio, Spin, Empty, type RadioChangeEvent } from "antd";

interface ChartData {
  name: string;
  count: number;
}

const HiringTrendsChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [timeRange, setTimeRange] = useState<string>("6months");
  const [loading, setLoading] = useState<boolean>(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchChartData = async (range: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/employer/hiring-trends`, {
        params: { range },
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (error) {
      console.error("Chart Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(timeRange);
  }, [timeRange]);

  const maxCount = useMemo(
    () => data.length > 0 ? Math.max(...data.map((d) => d.count)) : 0,
    [data]
  );

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Hiring Activity
          </p>
          <h3 className="text-[#0f172a] text-2xl font-bold leading-tight">
            Monthly Trends
          </h3>
        </div>

        <div className="bg-slate-50 p-1 rounded-xl">
          <Radio.Group
            value={timeRange}
            onChange={(e: RadioChangeEvent) => setTimeRange(e.target.value)}
            buttonStyle="solid"
            className="hiring-radio-group"
          >
            <Radio.Button value="6months" className="rounded-lg border-none shadow-none font-bold">
              Last 6 Months
            </Radio.Button>
            <Radio.Button value="year" className="rounded-lg border-none shadow-none font-bold">
              Last Year
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 300, position: "relative" }}>
        {loading ? (
          // ✅ Fixed: Spin tip only works in nest mode — wrap with Spin as parent
          <div className="flex items-center justify-center h-full">
            <Spin size="default" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data found" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "#0077b608" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={timeRange === "year" ? 25 : 45}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count === maxCount && maxCount > 0 ? "#0077b6" : "#bfdbfe"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <style jsx global>{`
        .hiring-radio-group .ant-radio-button-wrapper {
          border: none !important;
          background: transparent !important;
          color: #94a3b8 !important;
          box-shadow: none !important;
          height: 36px;
          line-height: 34px;
          font-weight: 600;
        }
        .hiring-radio-group .ant-radio-button-wrapper-checked {
          background: #ffffff !important;
          color: #0077b6 !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06) !important;
        }
        .hiring-radio-group .ant-radio-button-wrapper::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default HiringTrendsChart;