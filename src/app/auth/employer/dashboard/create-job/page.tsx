"use client"

import CreateJobHeader from "@/app/components/employer/createJob/CreateJobHeader";
import JobDetailsForm from "@/app/components/employer/createJob/JobDetailsForm";
import JobSteps from "@/app/components/employer/createJob/JobSteps";
import JobSuccess from "@/app/components/employer/createJob/jobSuccess";
import LivePreviewCard from "@/app/components/employer/createJob/LivePreviewCard";
import RequirementsForm from "@/app/components/employer/createJob/RequirementsForm";
import ReviewPostForm from "@/app/components/employer/createJob/ReviewPostForm";
import TeamCultureForm from "@/app/components/employer/createJob/TeamCultureForm";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CreateJob = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [allJobData, setAllJobData] = useState({
    title: "",
    department: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    skills: [],
    perks: [],
    experienceLevel: "",
    visibility: "public",
  });

  const updateFormData = (stepData: Record<string, unknown>) => {
    setAllJobData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const isSuccessPage = currentStep === 5;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handlePublish = async () => {
    const hide = message.loading("publishing your job...", 0);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/job`, allJobData, {
        withCredentials: true,
      });

      if (response.data.success) {
        hide();
        setCurrentStep(5);
        message.success("job published successfully!");
      }
    } catch (error: unknown) {
      hide();
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || "Faild to publish job");
      }
    }
  }; ;
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <JobDetailsForm onNext={handleNext} updateFormData={updateFormData}/>;
      case 2:
        return <RequirementsForm onBack={handleBack} onNext={handleNext} updateFormData={updateFormData}/>;
      case 3:
        return (
          <TeamCultureForm
            onBack={handleBack}
            onNext={handleNext}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <ReviewPostForm
            onBack={handleBack}
            onPublish={handlePublish}
            onEdit={handleEdit}
          />
        );

      case 5:
        return (
          <JobSuccess
            onGoToDashboard={() => console.log("Going to Dashboard")}
            onCreateAnother={() => setCurrentStep(1)}
          />
        );
      default:
        return <JobDetailsForm onNext={handleNext} updateFormData={updateFormData}/>;
    }
  };
  return (
    <div
      className={`min-h-screen ${isSuccessPage ? "bg-white" : "bg-[#f8f9fc]"}`}>
      {!isSuccessPage && (
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <JobSteps currentStep={currentStep} />
        </div>
      )}

      <div className='flex flex-col lg:flex-row gap-8 mt-10'>
        <div className='flex-1'>{renderStepForm()}</div>

        {!isSuccessPage && (
          <div className='w-full lg:w-[400px]'>
            <LivePreviewCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
