/** @format */
"use client";

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

interface JobFormData {
  title: string;
  jobType: string;
  department: string;
  location: string;
  isRemote: boolean;
  salaryMin: string;
  salaryMax: string;
  company: string;
  currency: string;
}

interface JobDetailsProps {
  onNext: () => void;
  updateFormData: (stepData: Record<string, unknown>) => void;
}

const JobDetailsForm = ({ onNext, updateFormData }: JobDetailsProps) => {
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    jobType: "Full Time",
    department: "Design",
    location: "",
    isRemote: false,
    salaryMin: "",
    salaryMax: "",
    company: "",
    currency: "USD ($)",
  });

  const handleChange = (field: keyof JobFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    const formattedSalary = `${formData.salaryMin} - ${formData.salaryMax} ${formData.currency}`;

    updateFormData({
      ...formData,
      salary: formattedSalary,
      description: description,
    });
    onNext();
  };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <div className='bg-white rounded-3xl border border-gray-100 p-8 shadow-sm'>
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-[#0e0f1b]'>Job Details</h2>
        <p className='text-gray-400 text-sm'>
          Provide the fundamental information about this opening
        </p>
      </div>

      <div className='space-y-6'>
        {/* Title */}
        <div className='flex flex-col gap-2'>
          <label className='font-bold text-[#0e0f1b] text-sm'>Job Title</label>
          <Input
            value={formData.title}
            placeholder='e.g. Senior Product Designer'
            className='h-12 bg-gray-50 border-none rounded-xl hover:bg-gray-100 focus:bg-white transition-all'
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Job Type & Department */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-bold text-[#0e0f1b] text-sm'>Job Type</label>
            <Select
              value={formData.jobType}
              onChange={(value) => handleChange("jobType", value)}
              options={[
                { value: "Full Time", label: "Full Time" },
                { value: "Part Time", label: "Part Time" },
                { value: "Contract", label: "Contract" },
              ]}
              className='h-12 w-full custom-select'
              variant='borderless'
              style={{ background: "#f9fafb", borderRadius: "12px" }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold text-[#0e0f1b] text-sm'>
              Department
            </label>
            <Select
              value={formData.department}
              onChange={(value) => handleChange("department", value)}
              options={[
                { value: "Design", label: "Design" },
                { value: "Engineering", label: "Engineering" },
                { value: "Marketing", label: "Marketing" },
              ]}
              className='h-12 w-full'
              variant='borderless'
              style={{ background: "#f9fafb", borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* Company Name */}
        <div className='flex flex-col gap-2'>
          <label className='font-bold text-[#0e0f1b] text-sm'>
            Company Name
          </label>
          <Input
            value={formData.company}
            placeholder='e.g. JobOrbit Inc.'
            className='h-12 bg-gray-50 border-none rounded-xl'
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        {/* Location & Remote */}
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <label className='font-bold text-[#0e0f1b] text-sm'>Location</label>
            <Checkbox
              className='text-[#4850e5] font-semibold text-xs'
              checked={formData.isRemote}
              onChange={(e) => handleChange("isRemote", e.target.checked)}>
              Remote Friendly
            </Checkbox>
          </div>
          <Input
            placeholder='San Francisco, CA'
            className='h-12 bg-gray-50 border-none rounded-xl'
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Salary Range */}
        <div className='space-y-2'>
          <label className='font-bold text-[#0e0f1b] text-sm'>
            Salary Range
          </label>
          <div className='grid grid-cols-1 md:grid-cols-7 gap-3 items-center'>
            <div className='md:col-span-2'>
              <Input
                placeholder='Min (e.g. 140000)'
                className='h-12 bg-gray-50 border-none rounded-xl'
                value={formData.salaryMin}
                onChange={(e) => handleChange("salaryMin", e.target.value)}
              />
            </div>
            <div className='text-center text-gray-400 font-medium'>to</div>
            <div className='md:col-span-2'>
              <Input
                placeholder='Max (e.g. 180000)'
                className='h-12 bg-gray-50 border-none rounded-xl'
                value={formData.salaryMax}
                onChange={(e) => handleChange("salaryMax", e.target.value)}
              />
            </div>
            <div className='md:col-span-2'>
              <Select
                value={formData.currency}
                onChange={(value) => handleChange("currency", value)}
                options={[
                  { value: "USD ($)", label: "USD ($)" },
                  { value: "EUR (€)", label: "EUR (€)" },
                  { value: "BDT (৳)", label: "BDT (৳)" },
                ]}
                className='h-12 w-full'
                variant='borderless'
                style={{ background: "#f9fafb", borderRadius: "12px" }}
              />
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className='flex flex-col gap-2'>
          <label className='font-bold text-[#0e0f1b] text-sm'>
            Job Description
          </label>
          <div className='rich-editor-wrapper'>
            <style>{`
              .ql-container { min-height: 200px; }
              .custom-quill-editor .ql-toolbar {
                border-top-left-radius: 12px; border-top-right-radius: 12px;
                border: 1px solid #f3f4f6 !important; background-color: #f9fafb !important; 
              }
              .custom-quill-editor .ql-container {
                border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;
                border: 1px solid #f3f4f6 !important; font-family: inherit;
              }
            `}</style>
            <ReactQuill
              theme='snow'
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder='Describe the role...'
              className='custom-quill-editor'
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='flex items-center justify-between pt-6 border-t border-gray-50'>
          <Button className='h-12 px-8 rounded-xl font-bold text-gray-400 bg-gray-50 border-none'>
            Save as Draft
          </Button>
          <Button
            onClick={handleContinue}
            type='primary'
            className='h-12 px-10 rounded-xl font-bold bg-[#4950e5]'>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForm;
