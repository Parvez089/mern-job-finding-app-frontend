/** @format */
"use client";

import React from "react";
import { Card, Tag } from "antd";
import { ArrowRight, Zap, Database } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string; // Keep it required
  salary: string;
  type: string;
  icon: React.ReactNode;
  iconBg: string;
}

const RecommendedJobs = () => {
  return (
    <div className='w-full'>
      <h2 className='text-2xl font-bold text-[#0e0f1b] mb-6'>Recommended</h2>
      <div className='flex flex-col gap-4'>
        <JobItem
          title='Visual Interaction Designer'
          company='Figma'
          location='Remote'
          salary='$140k - $180k'
          type='FULL TIME'
          icon={<Zap fill='white' size={20} />}
          iconBg='bg-[#ff7e3e]'
        />
        <JobItem
          title='Senior Product Architect'
          company='Notion'
          location='New York, NY'
          salary='$160k - $210k'
          type='CONTRACT'
          icon={<Database fill='white' size={20} />}
          iconBg='bg-[#0e0f1b]'
        />
      </div>
    </div>
  );
};

const JobItem = ({
  title,
  company,
  location,
  salary,
  type,
  icon,
  iconBg,
}: JobCardProps) => (
  <Card className='rounded-[2.5rem] border-none shadow-sm group cursor-pointer hover:shadow-md transition-all'>
    <div className='relative'>
      <Tag className='absolute top-0 right-0 bg-[#f3f4f6] border-none text-[10px] font-bold text-gray-400 py-0.5 px-2 rounded-md'>
        {type}
      </Tag>

      <div
        className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>

      <h4 className='text-lg font-bold text-[#0e0f1b] mb-1'>{title}</h4>
      {/* Updated to show company and location together as per your reference design */}
      <p className='text-sm font-semibold text-[#4850e5] mb-6'>
        {company} • {location}
      </p>

      <div className='flex justify-between items-center'>
        <p className='text-xl font-extrabold text-[#0e0f1b] mb-0'>{salary}</p>
        <div className='w-10 h-10 rounded-full bg-[#f0f1ff] text-[#4850e5] flex items-center justify-center group-hover:bg-[#4850e5] group-hover:text-white transition-colors'>
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  </Card>
);

export default RecommendedJobs;
