/** @format */
"use client";

import React from "react";
import {
  Progress,
  Tag,
  Button,
  message,
  Popconfirm,
  Dropdown,
  MenuProps,
} from "antd";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import axios from "axios";


interface JobData {
  _id: string;
  title: string;
  location: string;
  jobType: string;
  department: string;
  status: string;
  createdAt: string;
  candidates?: number;
  matchPercent?: number;
}

interface JobRowProps {
  job: JobData;
  onRefresh: () => void;
}


const statusConfig: Record<
  string,
  { text: string; bg: string; label: string }
> = {
  published: { text: "#16a34a", bg: "#f0fdf4", label: "Active" },
  draft: { text: "#d97706", bg: "#fffbeb", label: "Draft" },
  closed: { text: "#6b7280", bg: "#f3f4f6", label: "Closed" },
};

const JobRow = ({ job, onRefresh }: JobRowProps) => {
  const statusKey = job.status?.toLowerCase() || "closed";
  const currentStatus = statusConfig[job.status] || statusConfig.closed;


  const formattedDate = job.createdAt && !isNaN(Date.parse(job.createdAt)) 
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No Date";

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job/${job._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        message.success("Job deleted successfully");
        onRefresh();
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to delete job");
    }
  };


  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View Posting",
      icon: <Eye size={14} />,
      onClick: () => window.open(`/jobs/${job._id}`, "_blank"),
    },
    {
      key: "edit",
      label: "Edit Job",
      icon: <Edit size={14} />,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title='Delete the job'
          description='Are you sure to delete this job?'
          onConfirm={handleDelete}
          okText='Yes'
          cancelText='No'
          okButtonProps={{ danger: true }}>
          <span className='text-red-500 flex items-center gap-2'>
            <Trash2 size={14} /> Delete
          </span>
        </Popconfirm>
      ),
    },
  ];

  return (
    <tr className='hover:bg-gray-50 transition-colors border-b border-gray-50'>
      <td className='py-5 px-6'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg bg-indigo-50 text-indigo-600 uppercase'>
            {job.title.charAt(0) || "J"}
          </div>
          <div>
            <h4 className='font-bold! text-[#0e0f1b] mb-0.5'>{job.title}</h4>
            <p className='text-xs text-gray-400 font-medium'>
              {job.location} • {job.jobType}
            </p>
          </div>
        </div>
      </td>

      <td className='py-5 px-4 text-center'>
        <Tag className='rounded-md border-none bg-gray-50 text-gray-500 font-semibold!'>
          {job.department}
        </Tag>
      </td>

      <td className='py-5 px-4 w-[200px]'>
        <div className='flex justify-between items-end mb-1'>
          <span className='text-xs font-bold! text-[#0e0f1b]'>
            {job.candidates || 0} Candidates
          </span>
          <span className='text-[10px] font-bold text-gray-400'>
            {job.matchPercent || 0} % match
          </span>
        </div>
        <Progress
          percent={job.matchPercent || 0}
          showInfo={false}
          strokeColor='#4850e5'
          trailColor='#f1f2ff'
          strokeWidth={6}
          className='m-0'
        />
      </td>

      <td className='py-5 px-4 text-center text-sm font-semibold! text-gray-500'>
        {formattedDate}
      </td>

      <td className='py-5 px-4 text-center'>
        <Tag
          style={{
            backgroundColor: currentStatus.bg,
            color: currentStatus.text,
          }}
          className='rounded-full border-none px-4 font-bold text-[11px] uppercase'>
          {currentStatus.label}{" "}
    
        </Tag>
      </td>

      <td className='py-5 px-6 text-right'>
       
        <Dropdown menu={{ items }} trigger={["click"]} placement='bottomRight'>
          <Button
            type='text'
            className='hover:bg-gray-100 rounded-lg'
            icon={<MoreHorizontal size={20} className='text-gray-400' />}
          />
        </Dropdown>
      </td>
    </tr>
  );
};

export default JobRow;
