"use client"

import CreateJobHeader from "@/app/components/employer/createJob/CreateJobHeader";
import JobDetailsForm from "@/app/components/employer/createJob/JobDetailsForm";
import JobSteps from "@/app/components/employer/createJob/JobSteps";
import LivePreviewCard from "@/app/components/employer/createJob/LivePreviewCard";
import RequirementsForm from "@/app/components/employer/createJob/RequirementsForm";
import ReviewPostForm from "@/app/components/employer/createJob/ReviewPostForm";
import TeamCultureForm from "@/app/components/employer/createJob/TeamCultureForm";
import React, { useState } from "react";

const CreateJob = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handlePublish = () => {
    console.log("Job Published!");
  };
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <JobDetailsForm onNext={handleNext} />;
      case 2:
        return <RequirementsForm onBack={handleBack} onNext={handleNext} />;
      case 3:
        return <TeamCultureForm onBack={handleBack} onNext={handleNext} />;
      case 4:
        return (
          <ReviewPostForm
            onBack={handleBack}
            onPublish={handlePublish}
            onEdit={handleEdit}
          />
        );
      default:
        return <JobDetailsForm onNext={handleNext} />;
    }
  };
  return (
    <div className='min-h-screen '>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <JobSteps currentStep={currentStep} />
      </div>

      <div className='flex flex-col lg:flex-row gap-8 mt-10'>
        <div className='flex-1'>{renderStepForm()}</div>
        <div className='w-full lg:w-[400px]'>
          <LivePreviewCard />
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
