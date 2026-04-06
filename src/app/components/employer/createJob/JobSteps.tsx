/** @format */
import { CheckOutlined } from "@ant-design/icons";
import React from "react";


interface JobStepsProps {
  currentStep: number;
}

const JobSteps = ({ currentStep }: JobStepsProps) => {
  const steps = ["Job Details", "Requirements", "Team & Perks", "Review"];

  return (
        <div className='flex items-center justify-between max-w-4xl mx-auto my-8'>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
{/* <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white" // সম্পন্ন হলে গ্রিন
                    : isActive
                    ? "bg-[#4850e5] border-[#4850e5] text-white shadow-lg" // একটিভ হলে ব্লু
                    : "bg-white border-gray-200 text-gray-400"
                }`}> */}
        return (
          <div key={step} className='flex items-center flex-1 last:flex-none'>
            <div className='flex flex-col items-center gap-2 relative'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                  isCompleted ? "bg-green-500 border-green-500 text-white":
                  isActive
                    ? "bg-[#4850e5] border-[#4850e5] text-white shadow-lg shadow-indigo-100"
                    : "bg-white border-gray-100 text-gray-400"
                }`}>
                {isCompleted ? <CheckOutlined/> : stepNumber}
              </div>
              <span
                className={`absolute -bottom-6 whitespace-nowrap text-[11px] font-bold uppercase tracking-wider ${
                  isActive ? "text-[#4850e5]" : "text-gray-400"
                }`}>
                {step}
              </span>
            </div>

           
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-4 transition-all duration-500 ${
                  stepNumber < currentStep ? "bg-[#4850e5]" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JobSteps;


