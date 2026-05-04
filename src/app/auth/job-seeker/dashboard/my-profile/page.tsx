"use client";

import EducationSection from "@/app/components/job-seeker/Dashboard/profile/EducationSection";
import ExperienceSection from "@/app/components/job-seeker/Dashboard/profile/ExperienceSection";
import ProfileHeader from "@/app/components/job-seeker/Dashboard/profile/ProfileHeader";
import SkillsSection from "@/app/components/job-seeker/Dashboard/profile/SkillsSection";

export default function MyProfile() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <ProfileHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <ExperienceSection />
          <EducationSection />
        </div>
        <div className="space-y-6">
          <SkillsSection/>
        </div>
      </div>
    </div>
  );
}