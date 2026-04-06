/** @format */
"use client";

import React from "react";
import { Progress, Button, Typography, Card } from "antd";
import {
  Send,
  Star,
  MessageSquare,
  XCircle,
  TrendingUp,
  Calendar,
  Info,
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  bgColor: string;
  value: number;
  label: string;
  footer: React.ReactNode;
}

interface DashboardStats {
  profileCompletion: number;
  totalApplications: number;
  shortlisted: number;
  interviews: number;
  rejected: number;
}
const { Title, Text } = Typography;

const JobSeekerStats = () => {
  // Mock Data - In a MERN app, these would come from your API
  const stats = {
    completion: 80,
    applications: 24,
    shortlisted: 12,
    interviews: 5,
    rejected: 3,
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-12 gap-6 w-full'>
      {/* 1. Profile Performance Card (Large) */}
      <Card className='xl:col-span-4 rounded-3xl shadow-sm border-[#e8e8f3] overflow-hidden'>
        <div className='flex flex-col items-center text-center py-4'>
          <Progress
            type='circle'
            percent={stats.completion}
            strokeColor='#4850e5'
            strokeWidth={10}
            format={(percent) => (
              <div className='flex flex-col'>
                <span className='text-2xl font-bold text-[#0e0f1b]'>
                  {percent}%
                </span>
                <span className='text-[10px] text-gray-400 uppercase font-bold tracking-widest'>
                  Complete
                </span>
              </div>
            )}
            size={160}
          />
          <Title level={4} className='!mt-6 !mb-2'>
            Profile Performance
          </Title>
          <Text className='text-gray-400 px-6 mb-6'>
            Add a portfolio link to reach 100% and get the Gold Badge.
          </Text>
          <Button
            type='primary'
            size='large'
            className='w-full max-w-[200px] h-12 rounded-xl bg-[#4850e5] hover:!bg-[#3b43c4] shadow-lg shadow-indigo-200'>
            Complete Now
          </Button>
        </div>
      </Card>

      {/* 2. Stats Grid (Small Cards) */}
      <div className='xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Applications Sent */}
        <StatCard
          icon={<Send size={20} className='text-green-600' />}
          bgColor='bg-green-50'
          value={stats.applications}
          label='Applications Sent'
          footer={
            <div className='flex items-center gap-1 text-green-600 text-xs font-bold bottom-0'>
              <TrendingUp size={14} /> +12% this month
            </div>
          }
        />

        {/* Shortlisted */}
        <StatCard
          icon={<Star size={20} className='text-amber-500' />}
          bgColor='bg-amber-50'
          value={stats.shortlisted}
          label='Shortlisted'
          footer={
            <div className='flex items-center gap-1 text-amber-500 text-xs font-bold'>
              <TrendingUp size={14} /> +5% this month
            </div>
          }
        />

        {/* Interviews */}
        <StatCard
          icon={<MessageSquare size={20} className='text-blue-600' />}
          bgColor='bg-blue-50'
          value={stats.interviews}
          label='Interviews'
          footer={
            <div className='flex items-center gap-1 text-blue-600 text-xs font-bold'>
              <Calendar size={14} /> Next: Tomorrow
            </div>
          }
        />

        {/* Not Selected */}
        <StatCard
          icon={<XCircle size={20} className='text-red-500' />}
          bgColor='bg-red-50'
          value={stats.rejected}
          label='Not Selected'
          footer={
            <div className='flex items-center gap-1 text-red-500 text-xs font-bold underline cursor-pointer'>
              <Info size={14} /> See feedback
            </div>
          }
        />
      </div>
    </div>
  );
};

// Helper Component for the 4 Stat Cards
const StatCard = ({ icon, bgColor, value, label, footer }: StatCardProps) => (
  <Card className='rounded-3xl border-[#e8e8f3] shadow-sm hover:shadow-md transition-shadow'>
    <div className='flex flex-col h-full justify-between gap-12'>
      <div
        className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
      <div className='!bottom-0 lg:absolute  lg:pb-10'>
        <h3 className='text-3xl !font-extrabold text-[#0e0f1b]'>
          {value < 10 ? `0${value}` : value}
        </h3>
        <p className='text-gray-400 text-sm !font-bold'>{label}</p>
        <div className='text-2xl'>{footer}</div>
      </div>
    </div>
  </Card>
);

export default JobSeekerStats;
