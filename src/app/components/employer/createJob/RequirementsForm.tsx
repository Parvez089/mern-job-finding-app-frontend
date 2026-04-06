/** @format */

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Tag } from "antd";
import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill-new"),{
  ssr: false,
})
interface RequirementsFormProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (stepData: Record<string, unknown>) => void;
}

const RequirementsForm = ({
  onNext,
  onBack,
  updateFormData,
}: RequirementsFormProps) => {
  // Step 1: Local state SetUp
  const [skills, setSkills] = useState(["Figma", "React", "Leadership"]);
  const [skillInput, setSkillInput] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("senior");
  const [education, setEducation] = useState("bachelors");

  // Step 2: Add new skill
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skillInput.trim() && !skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  // Step 3: Send data parents
  const handleContinue = () => {
    updateFormData({
      skills:skills,
      responsibilities:responsibilities,
      experience: experienceLevel,
      education: education,
    });
    onNext();
  };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  return (
    <div className='bg-white rounded-3xl! border border-gray-100! p-6 md:p-8 shadow-sm'>
      {/* header  */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold! text-[#0e0f1b]'>
          Candidate Requirements
        </h2>
        <p className='text-gray-400 font-bold! '>
          Specify the skills, experience, and education needed for this.
        </p>
      </div>

      <div className='space-y-6!'>
        {/* Required Skills  */}
        <div className='flex flex-wrap gap-2 mb-2'>
          <label>Required Skills</label>
          <div>
            {skills.map((skill) => (
              <Tag
                key={skill}
                closable
                onClose={() => setSkills(skills.filter((s) => s !== skill))}
                className='px-4! py-1.5! rounded-full! border-blue-100! bg-blue-50! text-blue-600 font-medium text-sm flex items-center gap-1'>
                {skill}
              </Tag>
            ))}
          </div>
          <Input
            prefix={<SearchOutlined className='text-gray-400 mr-2' />}
            placeholder='Search and add skills (e.g., Python, UI Design)...'
            className='h-12! bg-gray-50! border-noneW rounded-xl!'
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
          />
        </div>

        {/* Experience and Education Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-bold! text-[#0e0f1b] text-sm'>
              Experience Level
            </label>
            <Select
              value={experienceLevel}
              onChange={(value) => setExperienceLevel(value)}
              defaultValue='Senior (5-8 years)'
              variant='borderless'
              className='h-12! w-full custom-select'
              style={{ background: "#f9fafb", borderRadius: "12px" }}
              options={[
                { value: "entry", label: "Entry Level" },
                { value: "mid", label: "Mid Level" },
                { value: "senior", label: "Senior (5-8 years)" },
              ]}
            />
          </div>

          {/* Education  */}
          <div className='flex flex-col gap-2'>
            <label className='font-bold! text-[#0e0f1b] text-sm'>
              Education
            </label>
            <Select
              value={education}
              onChange={(value) => setEducation(value)}
              defaultValue="Bachelor's Degree"
              variant='borderless'
              className='h-12! w-full custom-select'
              style={{ background: "#f9fafb", borderRadius: "12px" }}
              options={[
                { value: "highschool", label: "High School" },
                { value: "bachelors", label: "Bachelor's Degree" },
                { value: "masters", label: "Master's Degree" },
              ]}
            />
          </div>
        </div>

        {/* Key Responsibilities Section */}

        <div className='flex flex-col gap-2'>
          <label className='font-bold! text-[#0e0f1b] text-sm'>
            Key Responsibilities
          </label>
          <div className='rich-editor-wrapper'>
            <style>{`
              .custom-quill-editor .ql-toolbar {
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
                border: 1px solid #f3f4f6 !important;
                background-color: #f9fafb !important;
              }
              .custom-quill-editor .ql-container {
                min-height: 150px;
                border-bottom-left-radius: 12px;
                border-bottom-right-radius: 12px;
                border: 1px solid #f3f4f6 !important;
              }
            `}</style>
            <ReactQuill
              theme='snow'
              value={responsibilities}
              onChange={setResponsibilities}
              modules={modules}
              className='custom-quill-editor'
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='flex items-center justify-between pt-6 border-t border-gray-50 mt-8'>
          <Button
            onClick={onBack}
            className='h-12 px-6 rounded-xl! font-bold! text-gray-500 bg-gray-50! border-none flex items-center'>
            Back
          </Button>
          <Button
            type='primary'
            onClick={handleContinue}
            className='h-12 px-8 rounded-xl! font-bold! bg-[#4950e5] flex items-center gap-2'>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};;

export default RequirementsForm;
