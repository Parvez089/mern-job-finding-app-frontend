/** @format */
"use client";
import React from "react";
import { Table, Tag, Avatar, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface JobRecord {
  key: string;
  title: string;
  company: string;
  location: string;
  department: string;
  datePosted: string;
  applicants: number;
  status: "Active" | "Draft";
  initial: string;
  color: string;
}

const data: JobRecord[] = [
  {
    key: "1",
    title: "Senior Product Designer",
    company: "TechFlow Inc",
    location: "San Francisco, CA",
    department: "Design",
    datePosted: "Mar 12, 2024",
    applicants: 124,
    status: "Active",
    initial: "T",
    color: "#eff6ff",
  },
  {
    key: "2",
    title: "Lead Backend Engineer",
    company: "Lumino AI",
    location: "Remote",
    department: "Engineering",
    datePosted: "Mar 10, 2024",
    applicants: 42,
    status: "Draft",
    initial: "L",
    color: "#fff7ed",
  },
  {
    key: "3",
    title: "Marketing Operations Manager",
    company: "Nexus Group",
    location: "Austin, TX",
    department: "Marketing",
    datePosted: "Mar 08, 2024",
    applicants: 28,
    status: "Active",
    initial: "N",
    color: "#f0f9ff",
  },
];

const RecentJobPosts = () => {
  const columns: ColumnsType<JobRecord> = [
    {
      title: "JOB TITLE & COMPANY",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[#0077b6]"
            style={{ backgroundColor: record.color }}
          >
            {record.initial}
          </div>
          <div>
            <div className="text-[#0f172a] font-bold text-sm">{record.title}</div>
            <div className="text-slate-400 text-xs">
              {record.company} • {record.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "DEPARTMENT",
      dataIndex: "department",
      key: "department",
      render: (text) => (
        <span className="text-[#0f172a] font-medium">{text}</span>
      ),
    },
    {
      title: "DATE POSTED",
      dataIndex: "datePosted",
      key: "datePosted",
      render: (text) => <span className="text-slate-400">{text}</span>,
    },
    {
      title: "APPLICANTS",
      dataIndex: "applicants",
      key: "applicants",
      render: (count) => (
        <div className="flex items-center gap-2">
          {/* ✅ Fixed: use max={{ count, style }} instead of deprecated maxCount/maxStyle */}
          <Avatar.Group
            max={{
              count: 2,
              style: {
                color: "#fff",
                backgroundColor: "#0077b6",
                fontSize: "10px",
              },
            }}
            size="small"
          >
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
          </Avatar.Group>
          <span className="text-[10px] font-bold bg-blue-50 text-[#0077b6] px-1.5 py-0.5 rounded-full">
            +{count}
          </span>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className={`rounded-full px-3 py-0.5 border-none font-bold text-[11px] ${
            status === "Active"
              ? "bg-green-50 text-green-500"
              : "bg-amber-50 text-amber-500"
          }`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: () => (
        <Button
          type="text"
          icon={<MoreOutlined className="text-slate-400 rotate-90" />}
        />
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-[#0f172a] text-xl font-bold">Recent Job Posts</h3>
        <button className="text-[#0077b6] text-sm font-bold hover:underline">
          View All
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="[&_.ant-table-thead_tr_th]:!bg-transparent [&_.ant-table-thead_tr_th]:!text-slate-400 [&_.ant-table-thead_tr_th]:!text-[10px] [&_.ant-table-thead_tr_th]:!font-bold [&_.ant-table-thead_tr_th]:!uppercase [&_.ant-table-thead_tr_th]:!border-b [&_.ant-table-thead_tr_th]:!border-slate-100 [&_.ant-table-row]:!cursor-pointer"
      />
    </div>
  );
};

export default RecentJobPosts;