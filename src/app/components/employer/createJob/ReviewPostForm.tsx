/** @format */
"use client";
import { EditOutlined } from "@ant-design/icons";
import { Button, message, Select, Switch, Tag } from "antd";
import React from "react";

interface JobFormData {
  title?: string;
  department?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  perks?: string[];
  cultures?: string[];
  description?: string;
}

interface ReviewPostProps {
  formData?: JobFormData;
  onBack: () => void;
  onPublish: () => void;
  onEdit: (step: number) => void;
}

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className='text-xs text-gray-400 uppercase font-bold! mb-1'>{label}</p>
    <p className='font-semibold! text-[#0e0f1b]'>
      {value || (
        <span className='text-gray-300 font-normal italic text-xs'>
          Not specified
        </span>
      )}
    </p>
  </div>
);

const ReviewPostForm = ({
  formData = {},
  onBack,
  onPublish,
  onEdit,
}: ReviewPostProps) => {
  const handlePublishClick = async () => {
    try {
      await onPublish();
    } catch (error) {
      message.error("Faild to publish job");
    }
  };
  return (
    <div className='space-y-6 pb-10'>
      <div className='bg-white rounded-3xl! border border-gray-100! p-6 md:p-8 shadow-sm'>
        {/* Job Details Section */}
        <section className='mb-10 border-b border-gray-100 pb-8'>
          <div className='flex justify-between items-center mb-6'>
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <DetailItem label='Title' value={formData?.title} />
            <DetailItem label='Department' value={formData?.department} />
            <DetailItem label='Location' value={formData?.location} />
          </div>
        </section>

        {/* Requirements Section */}
        <section className='mb-10 border-b border-gray-100 pb-8'>
          <div className='flex justify-between items-center mb-6'>
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
          <div className='space-y-6'>
            <p className='text-xs text-gray-400 uppercase font-bold! mb-2'>
              Key Skills
            </p>
            <div className='flex flex-wrap gap-2'>
              {formData?.skills && formData.skills.length > 0 ? (
                formData.skills.map((skill) => (
                  <Tag
                    key={skill}
                    className='bg-gray-50! border-none px-3! py-1! rounded-md!'>
                    {skill}
                  </Tag>
                ))
              ) : (
                <span className='text-gray-300 text-xs'>
                  No skills selected
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className='flex items-center justify-between pt-4'>
          <Button
            onClick={onBack}
            className='h-12! px-8! rounded-xl! font-bold! text-gray-500 bg-gray-50! border-none'>
            Back
          </Button>
          <Button
            type='primary'
            onClick={handlePublishClick}
            className='h-12! px-12! rounded-xl! font-bold! bg-[#4950e5]! text-white!'>
            Publish Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPostForm;
