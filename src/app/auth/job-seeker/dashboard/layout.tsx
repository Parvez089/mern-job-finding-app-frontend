/** @format */
"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Search,
  MessageCircleMore,
  Settings,
  BellDot,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { Badge, Button, ConfigProvider, Menu, Spin } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadiusSettingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
interface DashboardProps {
  children: React.ReactNode;
}

interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
}
const JobseekerDahboard = ({ children }: DashboardProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/auth/job-seeker/dashboard",
      icon: <LayoutDashboard />,
      label: <Link href='/auth/job-seeker/dashboard'>Dashboard</Link>,
    },
    {
      key: "/auth/employer/dashboard/search-job",
      icon: <Search />,
      label: (
        <Link href='/auth/job-seeker/dashboard/search-job'>Search Jobs</Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/company-profile",
      icon: <FileText />,
      label: (
        <Link href='/auth/employer/dashboard/company-profile'>Application</Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/account-settings",
      icon: <MessageCircleMore />,
      label: (
        <Link href='/auth/employer/dashboard/account-settings'>Message</Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/subscriptions-billing",
      icon: <MessageCircleMore />,
      label: (
        <Link href='/auth/employer/dashboard/subscriptions-billing'>
          My Profile
        </Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/marketplace",
      icon: <Settings />,
      label: <Link href='/auth/employer/dashboard/marketplace'>Setting</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#4850e5" },
        components: {
          Menu: { itemSelectedBg: "#4850e512", itemSelectedColor: "#4850e5" },
        },
      }}>
      <div className='flex h-screen overflow-hidden bg-[#f6f6f8]'>
        {/* Mobile Overlay */}
        {!collapsed && isMobile && (
          <div
            className='fixed inset-0 bg-black/20 z-40 blackdrop-blur-sm transition-opacity'
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full bg-white border-r border-[#e8e8f3] z-50 flex flex-col transition-all duration-300 ${
            collapsed
              ? "-translate-x-full lg:translate-x-0 lg:w-20 "
              : "translate-x-0 w-64"
          }`}>
          {/* Logo Section */}

          <div className='h-20 flex items-center px-6 gap-3 overflow-hidden'>
            <div className='bg-[#4850e5] min-w-[40px] h-10 rounded-lg flex items-center justify-center text-white'>
              <RadiusSettingOutlined className='text-xl' />
            </div>
            {!collapsed && (
              <div className='flex flex-col'>
                <span className='text-[#0e0f1b] font-bold text-lg leading-tight'>
                  JobOrbit
                </span>
                <span className='text-[#505495] text-[10px] font-semibold uppercase tracking-wider'>
                  JobSeeker
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className='flex-1 overflow-y-auto py-4'>
            <Menu
              mode='inline'
              selectedKeys={[pathname]}
              items={menuItems}
              className='!border-none !bg-transparent px-3 [7_.ant-menu-item]:!h-11 [&_.ant-menu-item]:!text-[#505495]'
            />
          </div>
          {/* Sign Out */}
          <div className='p-4 border-t border-[#e8e8f3]'>
            <button className='flex items-center gap-3 w-full px-4 py-3 text-[#505495] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium group'>
              <LogoutOutlined className='text-lg' />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Area  */}
        <div className='flex flex-col flex-1 min-w-0'>
          <header className='h-20 bgwhite/80 backdrop-blur-md border-b border-[#e8e8f3] px-8 flex items-center justify-between sticky top-0 z-30'>
            <div className='flex items-center gap-4'>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className='text-[#505495] !text-xl'>
                <h2 className='text-xl font-bold text-[#0e0f1b] hidden md:block'>
                  Dashboard
                </h2>
              </Button>
            </div>

            <div className='flex items-center gap-6'>
              <Badge dot color='#ef4444'>
                <Bell />
              </Badge>
              <div className='flex items-center gap-3 cursor-pointer group'>
                <>
                  <div className='text-right hidden sm:block'>
                    <p className='text-sm font-bold text-[#0e0f1b]'>
                      user name
                    </p>
                    <p></p>
                  </div>
                </>
              </div>
            </div>
          </header>
          <main className='flex-1 overflow-y-auto p-6 md:p-8'>
            <div className='max-w-full mx-auto'>{children}</div>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default JobseekerDahboard;
