"use client";

import ProfileImage from "@/Component/profile/ProfileImage";
import { CalculatorOutlined } from "@ant-design/icons";
import { message as antMessage, Progress, Spin, Switch } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getEmployerProfile } from "../../../../services/employer";

const CompanyProfile = () => {
  const [employer, setEmployer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getEmployerProfile();
        
        // FIX 1: Access data through the 'message' property
        if (response && response.success) {
          setEmployer(response.message);
        } else {
          setEmployer(response); // Fallback
        }
      } catch (error) {
        antMessage.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <div className="flex justify-center mt-20"><Spin size="large" /></div>;
  if (!employer) return <div className="text-center mt-20">No profile data found.</div>;

  // FIX 2: Map the labels to your actual API keys (name, email, phone, position)
  const detailFields = [
    { label: "Full Name", value: employer.name },
    { label: "Email Address", value: employer.email },
    { label: "Phone Number", value: employer.phone },
    { label: "Job Position", value: employer.position },
  ];

  return (
    <div className="lg:mx-16 p-6">
      <div className="flex justify-between items-center border-b pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{employer.name}</h1>
          <p className="text-blue-600 font-medium">{employer.position}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Registered On</p>
          <p className="font-semibold">{new Date(employer.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Profile and Details */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4">Profile Image</h2>
            {/* Using secure_url from your API */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-sm">
                <Image 
                  src={employer.ProfileImage?.secure_url || "https://via.placeholder.com/150"} 
                  alt="Profile"
                  fill
                  className="object-cover"
                />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-bold text-gray-400 uppercase">Employee Details</h2>
            {detailFields.map((field, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase">{field.label}</p>
                <p className="text-gray-900 font-semibold">{field.value || "Not Set"}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Role & Teams */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4">Account Role</h2>
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block text-sm font-bold capitalize">
              {employer.role}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase">Connected Teams</h2>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="text-center">
                <span className="text-[9px] font-bold text-blue-500">HR</span>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    AH
                </div>
              </div>
              <p className="font-bold text-gray-700">Arif Hasan</p>
            </div>
          </section>
        </div>

        {/* Onboarding */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4">Next Milestone</h2>
            <div className="bg-blue-600 text-white p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-[10px] opacity-80 font-bold uppercase">Scheduled Start</p>
                <p className="text-lg font-bold">21.05.2025</p>
              </div>
              <CalculatorOutlined className="text-2xl" />
            </div>
          </section>

          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border">
            <span className="text-sm font-bold">Onboarding Required</span>
            <Switch size="small" checked={true} disabled />
          </div>

          <div className="space-y-3">
             <h2 className="text-xs font-bold text-gray-400 uppercase">Current Progress</h2>
             <div className="bg-white p-4 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-green-600">Active</span>
                    <span className="text-xs font-bold">35%</span>
                </div>
                <Progress percent={35} showInfo={false} strokeColor="#10b981" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;