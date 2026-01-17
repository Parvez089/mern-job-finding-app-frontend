/** @format */
"use client";

import React, { ReactNode } from "react"; // ReactNode টাইপটি ইম্পোর্ট করুন
import { usePathname } from "next/navigation";
import { Button, Badge, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Bell, Search, MessageSquare } from "lucide-react";

// ১. প্রতিটি পেইজের কনফিগারের জন্য টাইপ ডিফাইন করা
interface PageConfig {
  title: string;
  showSearch: boolean;
  searchPlaceholder?: string; // এটি অপশনাল কারণ সব পেইজে সার্চ নেই
  rightElement?: ReactNode; // JSX এলিমেন্টের জন্য ReactNode ব্যবহার করা হয়
  rightAction?: ReactNode;
  dateDisplay?: string;
}

// ২. মেইন হেডারের প্রপস টাইপ ডিফাইন করা
interface DashboardHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const DashboardHeader = ({ collapsed, setCollapsed }: DashboardHeaderProps) => {
  const pathname = usePathname();

  // ৩. 'any' এর বদলে Record টাইপ ব্যবহার করা
  const headerConfig: Record<string, PageConfig> = {
    "/dashboard": {
      title: "Recruitment Overview",
      showSearch: true,
      searchPlaceholder: "Search applicants, jobs...",
      rightElement: (
        <Badge dot>
          <Bell size={20} className='text-gray-500' />
        </Badge>
      ),
    },
    "/job-postings": {
      title: "Jobs",
      showSearch: true,
      searchPlaceholder: "Search jobs, departments...",
      rightElement: (
        <Badge dot>
          <MessageSquare size={20} className='text-gray-500' />
        </Badge>
      ),
    },
    "/interviews": {
      title: "Interviews",
      showSearch: true,
      searchPlaceholder: "Search interviews...",
      rightAction: (
        <Button
          type='primary'
          icon={<CalendarOutlined />}
          className='bg-[#4f46e5] rounded-lg h-10 font-bold'>
          Schedule Interview
        </Button>
      ),
    },
    "/profile-settings": {
      title: "Profile Settings",
      showSearch: false,
      dateDisplay: "Mar 24, 2024",
    },
  };

  const currentConfig = headerConfig[pathname] || headerConfig["/dashboard"];

  return (
    <header className='h-20 bg-white/80 backdrop-blur-md border-b border-[#e8e8f3] px-6 flex items-center justify-between sticky top-0 z-30'>
      <div className='flex items-center gap-4 flex-1'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className='text-[#505495] !text-xl'
        />
        <h2 className='text-lg font-bold text-[#0e0f1b] whitespace-nowrap hidden sm:block'>
          {currentConfig.title}
        </h2>

        {currentConfig.showSearch && (
          <div className='max-w-md w-full ml-4 hidden lg:block'>
            <Input
              prefix={<Search size={16} className='text-gray-400' />}
              placeholder={currentConfig.searchPlaceholder}
              className='bg-gray-50 border-none rounded-lg h-10'
            />
          </div>
        )}
      </div>

      <div className='flex items-center gap-4'>
        {currentConfig.rightAction && currentConfig.rightAction}

        <div className='flex items-center gap-4 border-l border-gray-200 pl-4 ml-2'>
          {currentConfig.dateDisplay && (
            <span className='text-sm font-bold text-gray-500 mr-2'>
              {currentConfig.dateDisplay} <CalendarOutlined className='ml-1' />
            </span>
          )}

          {currentConfig.rightElement || (
            <Badge dot color='#ef4444'>
              <Bell size={20} className='text-gray-400 cursor-pointer' />
            </Badge>
          )}

          
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
