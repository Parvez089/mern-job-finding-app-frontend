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
    color: "#eef2ff",
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
        <div className='flex items-center gap-3'>
          <div
            className='w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[#4850e5]'
            style={{ backgroundColor: record.color }}>
            {record.initial}
          </div>
          <div>
            <div className='text-[#0e0f1b] font-bold text-sm'>
              {record.title}
            </div>
            <div className='text-[#505495] text-xs'>
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
        <span className='text-[#0e0f1b] font-medium'>{text}</span>
      ),
    },
    {
      title: "DATE POSTED",
      dataIndex: "datePosted",
      key: "datePosted",
      render: (text) => <span className='text-[#505495]'>{text}</span>,
    },
    {
      title: "APPLICANTS",
      dataIndex: "applicants",
      key: "applicants",
      render: (count) => (
        <div className='flex items-center'>
          <Avatar.Group
            maxCount={2}
            size='small'
            maxStyle={{
              color: "#fff",
              backgroundColor: "#4850e5",
              fontSize: "10px",
            }}>
            <Avatar src='https://api.dicebear.com/7.x/avataaars/svg?seed=1' />
            <Avatar src='https://api.dicebear.com/7.x/avataaars/svg?seed=2' />
            <Avatar src='https://api.dicebear.com/7.x/avataaars/svg?seed=3' />
          </Avatar.Group>
          <span className='ml-2 text-[10px] font-bold bg-[#4850e515] text-[#4850e5] px-1.5 py-0.5 rounded-full'>
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
              ? "bg-[#f0fdf4] text-[#22c55e]"
              : "bg-[#fff7ed] text-[#f59e0b]"
          }`}>
          {status}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: () => (
        <Button
          type='text'
          icon={<MoreOutlined className='text-[#505495] rotate-90' />}
        />
      ),
    },
  ];

  return (
    <div className='bg-white p-6 rounded-[24px] border border-[#e8e8f3] shadow-sm overflow-hidden'>
      <div className='flex justify-between items-center mb-6 px-2'>
        <h3 className='text-[#0e0f1b] text-xl font-bold'>Recent Job Posts</h3>
        <button className='text-[#4850e5] text-sm font-bold hover:underline'>
          View All
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className='custom-table [&_.ant-table-thead_tr_th]:!bg-transparent [&_.ant-table-thead_tr_th]:!text-[#505495] [&_.ant-table-thead_tr_th]:!text-[10px] [&_.ant-table-thead_tr_th]:!font-bold [&_.ant-table-thead_tr_th]:!uppercase [&_.ant-table-thead_tr_th]:!border-b [&_.ant-table-thead_tr_th]:!border-[#f1f1f4] [&_.ant-table-row]:!cursor-pointer'
      />
    </div>
  );
};

export default RecentJobPosts;
