/** @format */
"use client";

import React from "react";
import { Button, Switch, Select, Tag } from "antd";
import {
  EditOutlined,
  SendOutlined,
  LeftOutlined,
  
} from "@ant-design/icons";

interface ReviewPostProps {
  onBack: () => void;
  onPublish: () => void;
  onEdit: (step: number) => void;
}

const ReviewPostForm = ({ onBack, onPublish, onEdit }: ReviewPostProps) => {
  return (
    <div className='space-y-6 pb-10'>
      {/* Review Section Card */}
      <div className='bg-white rounded-3xl! border border-gray-100! p-6 md:p-8 shadow-sm'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-xl font-bold! text-[#0e0f1b]'>
              Review Job Posting
            </h2>
            <p className='text-gray-400 text-sm'>
              Check the details before publishing your job post.
            </p>
          </div>
          <Tag
            color='blue'
            className='rounded-full px-4 py-1 font-semibold border-none bg-blue-50 text-blue-600'>
            DRAFT MODE
          </Tag>
        </div>

        {/* 1. Job Details Summary */}
        <section className='mb-10'>
          <div className='flex justify-between items-center border-b border-gray-50 pb-3 mb-4'>
            <h3 className='text-xs font-bold tracking-widest text-indigo-500 uppercase'>
              Job Details
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(1)}
              className='font-bold'>
              Edit
            </Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-1'>
                Title
              </p>
              <p className='font-bold text-[#0e0f1b]'>
                Senior Product Designer
              </p>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-1'>
                Department
              </p>
              <p className='font-bold text-[#0e0f1b]'>Product Experience</p>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-1'>
                Location
              </p>
              <p className='font-bold text-[#0e0f1b]'>
                San Francisco, CA (Hybrid)
              </p>
            </div>
          </div>
        </section>

        {/* 2. Requirements Summary */}
        <section className='mb-10'>
          <div className='flex justify-between items-center border-b border-gray-50 pb-3 mb-4'>
            <h3 className='text-xs font-bold tracking-widest text-indigo-500 uppercase'>
              Requirements
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(2)}
              className='font-bold'>
              Edit
            </Button>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-2'>
                Key Skills
              </p>
              <div className='flex flex-wrap gap-2'>
                {[
                  "Product Design",
                  "Figma Expert",
                  "Design Systems",
                  "User Research",
                ].map((skill) => (
                  <Tag
                    key={skill}
                    className='bg-gray-50 border-none px-3 py-1 rounded-md font-medium text-gray-600'>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-1'>
                Experience
              </p>
              <p className='text-sm text-gray-700 font-medium'>
                5+ years in senior roles at high-growth SaaS companies.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Team & Perks Summary */}
        <section>
          <div className='flex justify-between items-center border-b border-gray-50 pb-3 mb-4'>
            <h3 className='text-xs font-bold tracking-widest text-indigo-500 uppercase'>
              Team & Perks
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(3)}
              className='font-bold'>
              Edit
            </Button>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-2'>
                Selected Perks
              </p>
              <div className='flex flex-wrap gap-2'>
                <Tag color='success' className='rounded-full border-none px-3'>
                  Health Insurance
                </Tag>
                <Tag
                  color='processing'
                  className='rounded-full border-none px-3'>
                  Unlimited PTO
                </Tag>
                <Tag color='volcano' className='rounded-full border-none px-3'>
                  Gym Membership
                </Tag>
                <Tag color='purple' className='rounded-full border-none px-3'>
                  401k Matching
                </Tag>
              </div>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold mb-1'>
                Culture
              </p>
              <p className='text-sm italic text-gray-600'>
                Remote Friendly, Flexible Hours, Collaborative Environment
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Publishing Options Card */}
      <div className='bg-white rounded-3xl! border border-gray-100! p-6 md:p-8 shadow-sm'>
        <h3 className='text-lg font-bold text-[#0e0f1b] mb-6'>
          Publishing Options
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-gray-50 rounded-2xl p-5 flex items-center justify-between'>
            <div>
              <p className='font-bold text-sm text-[#0e0f1b]'>
                Post to External Job Boards
              </p>
              <p className='text-xs text-gray-400'>
                LinkedIn, Indeed, and Glassdoor
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className='space-y-2'>
            <p className='font-bold text-sm text-[#0e0f1b]'>Visibility</p>
            <Select
              className='w-full h-12 custom-select-review'
              defaultValue='public'
              style={{ borderRadius: "12px" }}
              options={[
                { value: "public", label: "Public (Anyone can see and apply)" },
                { value: "private", label: "Private (Link only)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className='flex items-center justify-between pt-4'>
        <Button
          icon={<LeftOutlined />}
          onClick={onBack}
          className='h-12 px-6 rounded-xl! font-bold! text-gray-500 bg-gray-50! border-none'>
          Back to Step 3
        </Button>
        <Button
          type='primary'
          onClick={onPublish}
          icon={<SendOutlined />}
          className='h-12 px-10 rounded-xl! font-bold! bg-[#4950e5] shadow-lg shadow-indigo-100'>
          Publish Job
        </Button>
      </div>
    </div>
  );
};

export default ReviewPostForm;
