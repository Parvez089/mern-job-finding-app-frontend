/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Avatar, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import QuickViewDrawer from "./QuickViewDrawer";

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

const ApplicantTable = ({ jobId }: { jobId?: string }) => {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = jobId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/applications/job/${jobId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/applications/employer/applicants`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setApplicants(response.data.data || []);
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to load applicants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const columns: ColumnsType<ApplicantData> = [
    {
      title: "APPLICANT",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className='flex items-center gap-3'>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className='font-bold text-[#0e0f1b]'>{text}</div>
            <div className='text-xs text-gray-400'>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "JOB APPLIED",
      dataIndex: "jobApplied",
      key: "jobApplied",
      render: (text) => (
        <span className='font-medium text-gray-600'>{text}</span>
      ),
    },
    {
      title: "STAGE",
      dataIndex: "stage",
      key: "stage",
      render: (stage: keyof typeof stageColors) => (
        <Tag
          color={stageColors[stage] || "default"}
          className='rounded-full px-3 border-none font-medium'>
          {stage}
        </Tag>
      ),
    },
    {
      title: "APPLIED DATE",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (text) => (
        <span className='text-gray-500 font-medium'>{text}</span>
      ),
    },
    // {
    //   title: "RATING",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rating) => (
    //     <Rate
    //       disabled
    //       defaultValue={rating}
    //       className='text-sm text-amber-400'
    //     />
    //   ),
    // },
    {
      title: "ACTIONS",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record: ApplicantData) => (
        <Space size='middle'>
          <Button
            type='link'
            className='text-[#4850e5] font-bold p-0'
            onClick={() => {
              setSelectedAppId(record._id);
              setIsDrawerVisible(true);
            }}>
            Quick View
          </Button>
          <Button
            type='text'
            icon={<MoreVertical size={18} className='text-gray-400' />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
      <Table
        columns={columns}
        dataSource={applicants}
        loading={loading}
        rowKey='_id'
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <QuickViewDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        applicationId={selectedAppId}
      />
    </div>
  );
};

export default ApplicantTable;
