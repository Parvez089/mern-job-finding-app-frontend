"use client"

import { Button, Checkbox, Input, Select } from "antd";
import React, { useState } from "react";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className='h-40 w-full bg-gray-50 animate-pulse rounded-xl' />
  ),
});

interface JobDetailsProps {
  onNext: () => void;
}
const JobDetailsForm = ({onNext}: JobDetailsProps) => {

  const [description, setDescription] = useState("")
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  return (
    <div className='bg-white rounded-3xl! border border-gray-100! p-8 shadow-sm'>
      <div className='mb-8'>
        <h2 className='text-xl font-bold! text-[#0e0f1b]'>Job Details</h2>

        <p className='text-gray-400 text-sm'>
          Provide the fundamental information about this opening
        </p>
      </div>

      <div className='space-y-6'>
        <div className='flex flex-col gap-2'>
          <label className='font-bold text-[#0e0f1b] text-sm '>Job Title</label>
          <Input
            placeholder='e.g. Senior Product Designer'
            className='h-12 bg-gray-50! border-none rounded-xl!'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-bold text-[#0e0f1b] text-sm'>
              Employer Type
            </label>

            <Select
              defaultValue='Full Time'
              className='h-12! w-full custom-select'
              variant='borderless'
              style={{ background: "#f9fafb", borderRadius: "12px" }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold text-[#0e0f1b] text-sm'>
              Department
            </label>
            <Select
              defaultValue='Design'
              className='h-12! w-full'
              bordered={false}
              style={{ background: "#f9fafb", borderRadius: "12px" }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <label className='font-bold text-[#0e0f1b] text-sm'>Location</label>
            <Checkbox className='text-[#4850e5] font-semibold text-xs'>
              Remote Friendly
            </Checkbox>
          </div>
          <Input
            placeholder='San Francisco, CA'
            className='h-12 bg-gray-50! border-none rounded-xl!'
          />

          <div className='flex flex-col gap-2'>
            <label className='font-bold! text-[#0eof1b] text-sm'>
              Job Description
            </label>

            <div className='rich-editor-wrapper'>
              <style>{`
    .ql-container {
      min-height: 200px; 
    }

    .custom-quill-editor .ql-toolbar {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border: 1px solid #f3f4f6 !important;
      background-color: #f9fafb !important; 
    }

    .custom-quill-editor .ql-container {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      border: 1px solid #f3f4f6 !important;
      font-family: inherit;
    }
  `}</style>
              <ReactQuill
                theme='snow'
                value={description}
                onChange={setDescription}
                modules={modules}
                placeholder='We are looking for a Senior Product Designer...'
                className='custom-quill-editor !'
              />
            </div>
          </div>

          <div className='flex items-center justify-between pt-6 border-t border-gray-50'>
            <Button className='h-112 px-8 rounded-xl! font-bold text-gray-400 bg-gray-50 border-none'>
              Save as Draft
            </Button>
            <Button
              onClick={onNext}
              type='primary'
              className='h-12 px-10 rounded-xl font-bold bg-[#4950e5]'>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForm;
