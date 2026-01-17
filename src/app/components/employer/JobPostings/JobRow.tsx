import React from "react";

import { Progress, Tag, Button } from 'antd';
import { MoreHorizontal } from 'lucide-react';
import { join } from "path";

interface JobrowProps {
  job: {
    title: string;
    location: string;
    type: string;
    department: string;
    candidates: number;
    matchPercent: number;
    dateCreated: string;
    status: "Active" | "Draft" | "Closed";
    avatarBg: string;
    avatarLetter: string;
  };
}
const JobRow = ({ job }: JobrowProps) => {
  const statusColors = {
    Active: { text: "#16a34a", bg: "#f0fdf4" },
    Draft: { text: "#d97706", bg: "#fffbeb" },
    Closed: { text: "#6b7280", bg: "#f3f4f6" },
  };
  return (
    <tr className='hover:bg-gray-50 transition-colors border-b border-gray-50'>
      <td className='py-5 px-6'>
        <div className='flex items-center gap-4'>
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${job.avatarBg}`}>
            {job.avatarLetter}
          </div>
          <div className=''>
            <h4 className='font-bold! text-[#0e0f1b] mb-0.5'>{job.title}</h4>
            <p className='text-xs text-gray-400 font-medium'>
              {job.location}.{job.type}
            </p>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className='py-5 px-4 text-center'>
        <Tag className='rounded-md border-none bg-gray-50 text-gray-500 font-semibold!'>
          {job.department}
        </Tag>
      </td>

      <td className='py-5 px-4 w-[200px]'>
        <div className='flex justify-between items-end mb-1'>
          <span className='text-xs font-bold! text-[#0e0f1b]'>
            {job.candidates}
          </span>
          <span className='text-[10px] font-bold text-gray-400'>
            {job.matchPercent}
          </span>
        </div>
        <Progress
          percent={job.matchPercent}
          showInfo={false}
          strokeColor='#4850e5'
          trailColor='#f1f2ff'
          strokeWidth={6}
          className='m-0'
        />
      </td>

      {/* Date created */}
      <td className='py-5 px-4 text-center text-sm font-semibold! text-gray-500'>
        {job.dateCreated}
      </td>

      {/* Status */}
      <td className='py-5 px-4 text-center'>
        <Tag
          style={{
            backgroundColor: statusColors[job.status].bg,
            color: statusColors[job.status].text,
          }}
          className='rounded-full border-none px-4 font-bold text-[11px]'>
          {job.status}
        </Tag>
      </td>

      {/* Action */}
      <td className='py-5 px-6 text-right'>
        <Button
          type='text'
          icon={<MoreHorizontal size={20} className='text-gray-400' />}
        />
      </td>
    </tr>
  );
};

export default JobRow;
  