/** @format */
"use client";
import React from "react";

// এই ইন্টারফেসটি যোগ করুন
interface RequirementsFormProps {
  onNext: () => void;
}

const RequirementsForm = ({ onNext }: RequirementsFormProps) => {
  return (
    <div className='bg-white rounded-3xl border border-gray-100 p-8 shadow-sm'>
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-[#0e0f1b]'>
          Candidate Requirements
        </h2>
        <p className='text-gray-400 text-sm'>
          Specify the skills, experience, and education needed for this role.
        </p>
      </div>

      {/* আপনার ফর্মের বাকি অংশ এখানে থাকবে */}

      <div className='mt-8'>
        <button
          onClick={onNext}
          className='bg-[#4950e5] text-white px-10 py-3 rounded-xl font-bold'>
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequirementsForm;
