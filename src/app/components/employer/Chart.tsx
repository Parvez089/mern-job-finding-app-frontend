/** @format */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
import {
  Radio,
  Spin,
  Empty,
  Typography,
  message,
  type RadioChangeEvent,
} from "antd";

const { Title, Text } = Typography;

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
      const res = await axios.get(
        `${API_BASE_URL}/api/employer/hiring-trends`,
        {
          params: { range },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Chart Fetch Error:", error);
      message.error("Could not load hiring trends.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(timeRange);
  }, [timeRange, API_BASE_URL]);

  const maxCount = useMemo(
    () =>
      data.length > 0 ? Math.max(...data.map((d: ChartData) => d.count)) : 0,
    [data]
  );

  return (
    <div className='bg-white p-8 rounded-[24px] border border-[#e8e8f3] shadow-sm w-full'>
      {/* Header & Controls */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4'>
        <div>
          <Text className='text-[#505495] text-sm font-medium block uppercase tracking-wide'>
            Hiring Activity
          </Text>
          <Title
            level={3}
            className='!m-0 !text-[#0e0f1b] !text-2xl !font-bold'>
            Monthly Trends
          </Title>
        </div>

        <div className='bg-[#f6f6f8] p-1 rounded-xl'>
          <Radio.Group
            value={timeRange}
            onChange={(e: RadioChangeEvent) => setTimeRange(e.target.value)}
            buttonStyle='solid'
            className='hiring-radio-group'>
            <Radio.Button
              value='6months'
              className='rounded-lg border-none shadow-none font-bold'>
              Last 6 Months
            </Radio.Button>
            <Radio.Button
              value='year'
              className='rounded-lg border-none shadow-none font-bold'>
              Last Year
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Chart Display */}
      <div style={{ height: "300px", position: "relative" }}>
        {loading ? (
          <div className='flex items-center justify-center h-full'>
            <Spin tip='Analyzing user data...' />
          </div>
        ) : data.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No data found'
          />
        ) : (
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
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey='count'
                radius={[6, 6, 0, 0]}
                barSize={timeRange === "year" ? 25 : 45}>
                {data.map((entry: ChartData, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.count === maxCount && maxCount > 0
                        ? "#4850e5"
                        : "#4850e530"
                    }
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
          color: #505495 !important;
          box-shadow: none !important;
          height: 36px;
          line-height: 34px;
        }
        .hiring-radio-group .ant-radio-button-wrapper-checked {
          background: #ffffff !important;
          color: #4850e5 !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
        }
        .hiring-radio-group .ant-radio-button-wrapper:before {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default HiringTrendsChart;
