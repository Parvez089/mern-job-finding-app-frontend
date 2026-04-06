/** @format */

"use client";

import CreateJobHeader from "@/app/components/employer/createJob/CreateJobHeader";
import JobDetailsForm from "@/app/components/employer/createJob/JobDetailsForm";
import JobSteps from "@/app/components/employer/createJob/JobSteps";
import JobSuccess from "@/app/components/employer/createJob/jobSuccess";
import LivePreviewCard from "@/app/components/employer/createJob/LivePreviewCard";
import RequirementsForm from "@/app/components/employer/createJob/RequirementsForm";
import ReviewPostForm from "@/app/components/employer/createJob/ReviewPostForm";
import TeamCultureForm from "@/app/components/employer/createJob/TeamCultureForm";
import { App } from "antd";
import axios from "axios";
import React, { useState } from "react";

interface JobData {
  title: string;
  department: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  description: string;
  skills: string[];
  perks: string[];
  cultures: string[];
  experience: string;
  visibility: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CreateJobContent = () => {
  const { message } = App.useApp();
  const [currentStep, setCurrentStep] = useState(1);

  const initialState: JobData = {
    title: "",
    department: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    skills: [],
    perks: [],
    cultures: [],
    experience: "",
    visibility: "public",
  };
  const [allJobData, setAllJobData] = useState<JobData>(initialState);

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
      const token = localStorage.getItem("token");

      if (!token) {
        hide();
        message.error("Session expired. Please login again.");
        return;
      }


      const payload = {
            title: allJobData.title,
            department: allJobData.department,
            company: allJobData.company,
            location: allJobData.location,
            jobType: allJobData.jobType,
            salary: allJobData.salary,
            description: allJobData.description || "",
            skills: allJobData.skills || [],
            perks: allJobData.perks || [],
            cultures: allJobData.cultures || [], 
            experience: allJobData.experience || "",
            responsibilities: allJobData.description || "", 
            education: "",
            visibility: allJobData.visibility || "public"
        };
      const response = await axios.post(`${API_BASE_URL}/api/job`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        console.error("Missing Field Details:", error.response?.data);
        const errorMessage =
          error.response?.data?.message || "Failed to publish job";
        message.error(errorMessage);

        if (error.response?.status === 401) {
          console.error(
            "Unauthorized access - logic to redirect to login can go here",
          );
        }
      } else {
        console.error("Unexpected Error:", error);
        message.error("An unexpected error occurred");
      }
    }
  };
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <JobDetailsForm onNext={handleNext} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <RequirementsForm
            onBack={handleBack}
            onNext={handleNext}
            updateFormData={updateFormData}
          />
        );
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
            formData={allJobData}
            onBack={handleBack}
            onPublish={handlePublish}
            onEdit={handleEdit}
          />
        );

      case 5:
        return (
          <JobSuccess
            onGoToDashboard={() => console.log("Going to Dashboard")}
            onCreateAnother={() => {
              setAllJobData({
                title: "",
                department: "",
                company: "",
                location: "",
                jobType: "Full-time",
                salary: "",
                description: "",
                skills: [],
                perks: [],
                cultures: [],
                experience: "",
                visibility: "public",
              });
              setCurrentStep(1);
            }}
          />
        );
      default:
        return (
          <JobDetailsForm onNext={handleNext} updateFormData={updateFormData} />
        );
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
            {/* formData={allJobData} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJobContent;
