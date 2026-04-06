/** @format */
"use client";

import React from "react";
import { Table, Tag, Card, Button } from "antd";
import { Zap, Database, Circle } from "lucide-react";

interface ActivityData {
  key: string;
  company: string;
  subTitle: string;
  logo: React.ReactNode;
  role: string;
  dateApplied: string;
  status: 'INTERVIEW' | 'SHORTLISTED' | 'APPLIED';
}

const RecentActivity = () => {
  const columns = [
    {
      title: "COMPANY",
      dataIndex: "company",
      key: "company",
      render: (text: string, record: ActivityData) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e0f1b] flex items-center justify-center text-white">
            {record.logo}
          </div>
          <div>
            <p className="font-bold text-[#0e0f1b] mb-0 leading-tight">{text}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{record.subTitle}</p>
          </div>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <span className="font-bold text-[#0e0f1b]">{role}</span>,
    },
    {
      title: "DATE APPLIED",
      dataIndex: "dateApplied",
      key: "dateApplied",
      render: (date: string) => <span className="text-[#4850e5] font-semibold">{date}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap = {
          INTERVIEW: { bg: "#e0f2fe", text: "#0ea5e9" },
          SHORTLISTED: { bg: "#fef3c7", text: "#d97706" },
          APPLIED: { bg: "#f0fdf4", text: "#16a34a" },
        };
        const style = colorMap[status as keyof typeof colorMap];
        return (
          <Tag 
            bordered={false} 
            className="rounded-full px-3 py-0.5 font-bold text-[10px]"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  const data: ActivityData[] = [
    { key: "1", company: "Linear", subTitle: "Productivity Tool", logo: <Zap size={18} fill="white"/>, role: "Senior Product Designer", dateApplied: "Oct 12, 2023", status: "INTERVIEW" },
    { key: "2", company: "Stripe", subTitle: "Fintech Ecosystem", logo: <Circle size={18} fill="white"/>, role: "Brand Lead", dateApplied: "Oct 10, 2023", status: "SHORTLISTED" },
    { key: "3", company: "Vercel", subTitle: "Deployment Platform", logo: <Database size={18} fill="white"/>, role: "UX Engineer", dateApplied: "Oct 08, 2023", status: "APPLIED" },
    { key: "3", company: "Vercel", subTitle: "Deployment Platform", logo: <Database size={18} fill="white"/>, role: "UX Engineer", dateApplied: "Oct 08, 2023", status: "APPLIED" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0e0f1b]">Recent Activity</h2>
        <Button type="link" className="text-[#4850e5] font-bold !p-0">View All Applications</Button>
      </div>
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false} 
          className="custom-dashboard-table"
        />
      </Card>
    </div>
  );
};

export default RecentActivity;