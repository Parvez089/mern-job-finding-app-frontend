/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag, Rate, Button, Avatar, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

interface ApplicantData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  jobApplied: string;
  stage: "Interviewing" | "Offered" | "Applied" | "Rejected";
  appliedDate: string;
  rating: number;
}

const stageColors = {
  Interviewing: "blue",
  Offered: "green",
  Applied: "default",
  Rejected: "red",
};

const ApplicantTable = ({jobId}: {jobId?: string}) => {

  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchApplicants = async () =>{
      setLoading(true);
      try{
        const token = localStorage.getItem("token");

        const url = jobId 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/applications/job/${jobId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/applications/employer/applicants`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setApplicants(response.data.data || []);
      } catch(error: any){
        message.error(error.response?.data?.message || "Failed to load applicants");
      } finally{
        setLoading(false);
      }
    }

    useEffect(() => {
    fetchApplicants();
  }, [jobId]);
  const columns: ColumnsType<ApplicantData> = [
    {
      title: "APPLICANT",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="font-bold text-[#0e0f1b]">{text}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "JOB APPLIED",
      dataIndex: "jobApplied",
      key: "jobApplied",
      render: (text) => <span className="font-medium text-gray-600">{text}</span>,
    },
    {
      title: "STAGE",
      dataIndex: "stage",
      key: "stage",
      render: (stage: keyof typeof stageColors) => (
        <Tag color={stageColors[stage]} className="rounded-full px-3 border-none font-medium">
          {stage}
        </Tag>
      ),
    },
    {
      title: "APPLIED DATE",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (text) => <span className="text-gray-500 font-medium">{text}</span>,
    },
    {
      title: "RATING",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} className="text-sm text-amber-400" />,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button type="link" className="text-[#4850e5] font-bold">Quick View</Button>
          <Button type="text" icon={<MoreVertical size={18} className="text-gray-400" />} />
        </Space>
      ),
    },
  ];


  // const data: ApplicantData[] = [
  //   { key: "1", name: "Sarah Jenkins", email: "sarah.j@example.com", avatar: "https://i.pravatar.cc/150?u=1", jobApplied: "Senior Product Designer", stage: "Interviewing", appliedDate: "Mar 15, 2024", rating: 4 },
  //   { key: "2", name: "Marcus Holloway", email: "m.holloway@example.com", avatar: "https://i.pravatar.cc/150?u=2", jobApplied: "Lead Backend Engineer", stage: "Offered", appliedDate: "Mar 14, 2024", rating: 5 },
  //   { key: "3", name: "Elena Rodriguez", email: "elena.r@example.com", avatar: "https://i.pravatar.cc/150?u=3", jobApplied: "Marketing Operations Manager", stage: "Applied", appliedDate: "Mar 18, 2024", rating: 3 },
  //   { key: "3", name: "Elena Rodriguez", email: "elena.r@example.com", avatar: "https://i.pravatar.cc/150?u=3", jobApplied: "Marketing Operations Manager", stage: "Applied", appliedDate: "Mar 18, 2024", rating: 3 },
  //   { key: "3", name: "Elena Rodriguez", email: "elena.r@example.com", avatar: "https://i.pravatar.cc/150?u=3", jobApplied: "Marketing Operations Manager", stage: "Applied", appliedDate: "Mar 18, 2024", rating: 3 },
  // ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
     <Table
        columns={columns}
        dataSource={applicants} 
        loading={loading}
        rowKey="_id" 
        pagination={{ 
          total: applicants.length, 
          pageSize: 5, 
          showSizeChanger: false, 
          className: "custom-pagination" 
        }}
      />
    </div>
  );
};

export default ApplicantTable;