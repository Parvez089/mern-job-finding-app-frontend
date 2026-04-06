/** @format */
"use client";

import React from "react";
import { Button, Input, message } from "antd";
import {
  CheckCircleFilled,
  LinkedinFilled,
  AppstoreOutlined,
  PlusOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostedJobData {
  _id?: string;
  title: string;
  department: string;
  company: string;
  location: string;
  jobType: string;
  salary?: string;
}

interface JobSuccessProps {
  onGoToDashboard?: () => void;
  onCreateAnother: () => void;
  jobData?: PostedJobData;
}

const JobSuccess = ({
  onGoToDashboard,
  onCreateAnother,
  jobData,
}: JobSuccessProps) => {
  const router = useRouter();
  const jobLink = `https://joborbit.com/jobs/${jobData?._id || ""}`;

  const handleCopy = () => {
    if (jobData?._id) {
      navigator.clipboard.writeText(jobLink);
      message.success("Link copied to clipboard!");
    }
  };

  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className='min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center py-12 px-4'>
      <div className='text-center mb-10'>
        <div className='relative inline-block mb-6'>
          <div className='absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25'></div>
          <div className='relative flex items-center justify-center w-24 h-24 bg-green-50 rounded-full border-8 border-white shadow-sm'>
            <CheckCircleFilled className='text-5xl text-green-500!' />
          </div>
        </div>
        <h1 className='text-4xl font-black text-[#0e0f1b] mb-3'>
          Congratulations!
        </h1>
        <p className='text-gray-500 text-lg'>
          Your job at {jobData?.company} now live.
        </p>
      </div>

      <div className='w-full max-w-2xl bg-white rounded-[32px]! border border-gray-100 p-8 shadow-xl shadow-gray-100/50 mb-10'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6 mb-8'>
          <div className='flex items-center gap-5'>
            <div className='w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm'>
              <Briefcase className='text-3xl text-blue-600' />
            </div>
            <div className='text-center md:text-left'>
              <h3 className='text-xl font-bold text-[#0e0f1b]'>
                {jobData?.title}
              </h3>
              <p className='text-sm text-gray-400 font-medium'>
                {jobData?.department} • {jobData?.location}
              </p>
            </div>
          </div>
          <Button
            type='link'
            icon={<ExportOutlined />}
            className='text-blue-600 font-bold hover:bg-blue-50 h-10 px-4 rounded-xl transition-all'>
            View Live Posting
          </Button>
        </div>

        <div className='flex items-center justify-center md:justify-start gap-4 pt-6 border-t border-gray-50 opacity-60'>
          <div className='flex gap-3 grayscale'>
            <div className='w-14 h-4 bg-gray-200 rounded'></div>
            <div className='w-10 h-4 bg-gray-200 rounded'></div>
            <div className='w-12 h-4 bg-gray-200 rounded'></div>
          </div>
          <span className='text-[11px] font-bold text-gray-400 uppercase tracking-wider'>
            Synced with LinkedIn, Indeed, and Glassdoor
          </span>
        </div>
      </div>

      <div className='w-full max-w-2xl text-center space-y-6'>
        <p className='text-[11px] font-black tracking-[0.25em] text-gray-300 uppercase'>
          Share & Promote
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 bg-white p-2 rounded-[20px] border border-gray-50 shadow-sm'>
          <Input
            value={jobLink}
            readOnly
            bordered={false}
            className='h-12 font-medium text-gray-500 pl-4'
          />
          <div className='flex gap-2 w-full md:w-auto pr-1'>
            <Button
              onClick={handleCopy}
              className='h-11 px-6 rounded-2xl font-bold bg-gray-50 border-none hover:bg-gray-100 transition-all'>
              Copy Link
            </Button>
            <Button className='h-11 w-11 flex items-center justify-center rounded-2xl bg-[#0077b5] border-none text-white text-xl hover:opacity-90'>
              <LinkedinFilled />
            </Button>
            <Button className='h-11 w-11 flex items-center justify-center rounded-2xl bg-black border-none text-white text-lg hover:opacity-90'>
              <span className='font-black'>X</span>
            </Button>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-5 pt-10'>
          <Button
            onClick={handleGoToDashboard}
            icon={<AppstoreOutlined />}
            className='h-14 px-10 rounded-[20px] bg-blue-600! text-white! font-bold border-none shadow-lg shadow-blue-200 hover:bg-blue-700! transition-all flex items-center gap-2'>
            Go to Jobs Dashboard
          </Button>
          <Button
            onClick={onCreateAnother}
            icon={<PlusOutlined />}
            className='h-14 px-10 rounded-[20px] bg-white! text-[#0e0f1b] font-bold border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2'>
            Create Another Job
          </Button>
        </div>
      </div>

      <div className='absolute bottom-8 flex gap-8 text-gray-400! text-[13px] font-medium!'>
        <a href='#' className='hover:text-blue-600 transition-colors'>
          Help Center
        </a>
        <a href='#' className='hover:text-blue-600 transition-colors'>
          Privacy Policy
        </a>
        <a href='#' className='hover:text-blue-600 transition-colors'>
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default JobSuccess;
