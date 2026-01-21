/** @format */
"use client";
import { EditOutlined } from "@ant-design/icons";
import { Button, Select, Switch, Tag } from "antd";
import React from "react";
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
        <div className='flex items-center justify-between mb-8 border-b border-gray-100'>
          <div className='mb-8'>
            <h2 className='text-xl font-bold! text-[#0e0f1b] '>
              Review Job Posting
            </h2>

            <p className='text-gray-400 text-sm'>
              Check the details before publishing your job post.
            </p>
          </div>

          <Tag color='blue' className='rounded-full! px-4! py-1!'>
            Draft Mode
          </Tag>
        </div>

        {/* Job Details Summary */}
        <section className='mb-10 border-b border-gray-100'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xs font-bold! tracking-widest text-indigo-500 uppercase'>
              Job Details
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(1)}
              className='font-bold!'>
              Edit
            </Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-4'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold!'>
                Title
              </p>
              <p className='font-semibold! text-[#0e0f1b]'>
                Senior Product Designer
              </p>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold!'>
                Department
              </p>
              <p className='font-semibold! text-[#0e0f1b]'>
                Product Experience
              </p>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold!'>
                Location
              </p>
              <p className='font-semibold! text-[#0e0f1b]'>
                San Francisco, CA (Hybrid)
              </p>
            </div>
          </div>
        </section>

        {/* Requirements Summary */}
        <section className='mb-10! border-b border-gray-100'>
          <div className='flex justify-between items-center mb-4!'>
            <h3 className='text-xs font-bold! tracking-widest text-indigo-500 uppercase'>
              Requirements
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(2)}
              className='font-bold!'>
              Edit
            </Button>
          </div>
          <div className='space-y-4 mb-8'>
            <div className='mt-4'>
              <p className='text-xs text-gray-400 uppercase font-bold mb-2'>
                Key Skills
              </p>
              <div>
                {[
                  "Product Design",
                  "Figma Expert",
                  "Design Systems",
                  "User Research",
                ].map((skill) => (
                  <Tag
                    key={skill}
                    className='bg-gray-50! flex flex-col border-none px-3! py-1! rounded-md! font-medium! text-gray-600 gap-4'>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold!'>
                Experience
              </p>
              <p className='text-sm text-gray-700 font-medium'>
                5+ years in senior roles at high-growth SaaS companies.
              </p>
            </div>
          </div>
        </section>

        {/* 3.Team & Perks Summary */}
        <section>
          <div className='flex justify-between items-center pb-3! mb-4!'>
            <h3 className='text-xs font-bold! tracking-widest text-indigo-500 uppercase'>
              Team & Perks
            </h3>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(3)}
              className='font-bold!'>
              Edit
            </Button>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold! mb-2'>
                Selected Perks
              </p>
              <div className='flex flex-wrap gap-2'>
                <Tag
                  color='success'
                  className='rounded-full! border-none px-3!'>
                  Health Insurance
                </Tag>
                <Tag
                  color='volcano'
                  className='rounded-full! border-none px-3!'>
                  Gym Membership
                </Tag>
                <Tag color='purple' className='rounded-full! border-none px-3!'>
                  401 Matching
                </Tag>
              </div>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase font-bold! mb-2'>
                Culture
              </p>
              <p className='text-sm italic text-gray-600'>
                Remote Friendly, Flexible Hours, Collaborative Environment
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Publishing Option Card */}
      <div className='bg-white rounded-3xl! p-6 md:p-8 shadow-sm'>
        <h3 className='text-lg font-bold! text-[#0e0f1b] mb-6'>
          Publishing Options
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-gray-50 rounded-2xl! p-5 flex items-center justify-between'>
            <div>
              <p className='font-bold! text-sm text-[#0e0f1b]'>
                Post to External Job Boards
              </p>
              <p className='text-xs text-gray-400'>
                LinkedIn, Indeed, and Glassdoor
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className='space-y-2!'>
            <p className='font-bold! text-sm'>Visibility</p>
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
          onClick={onBack}
          className='h-8
        ! px-6! rounded-xl! font-bold! text-gray-500 bg-gray-50! border-none'>
          Back
        </Button>
        <Button
          type='primary'
          onClick={onPublish}
          className='h-8! px-10! rounded-xl! font-bold! bg-[#4950e5]! shadow-lg text-white! shadow-indigo-100'>
          Publish Job
        </Button>
      </div>
    </div>
  );
};

export default ReviewPostForm;
