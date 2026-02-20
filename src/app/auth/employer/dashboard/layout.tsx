/** @format */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  UnorderedListOutlined,
  VideoCameraOutlined,
  UsergroupAddOutlined,
  RadiusSettingOutlined,
  AccountBookOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  NotificationFilled,
} from "@ant-design/icons";
import {
  Menu,
  Avatar,
  Badge,
  Spin,
  Layout,
  Button,
  ConfigProvider,
} from "antd";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { Bell, BriefcaseBusiness, CalendarCheck, CircleUser, Database, LayoutDashboard, Settings, Users } from "lucide-react";
import DashboardHeader from "@/app/components/employer/dashboard/DashboardHeader";
import CreateJobHeader from "@/app/components/employer/createJob/CreateJobHeader";

const { Header, Sider, Content } = Layout;

// 🔹 Types
interface EmployerProfile {
  name: string;
  email: string;
  profilePicture?: string;
}

const EmployerDashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname(); // 🔹 Hook to get current URL path
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const isCreateJobPage = pathname.includes("/create-job")
  // 1. Logout Logic (useCallback to prevent unnecessary re-renders)
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setProfile(null);
    router.replace("/");
  }, [router]);


  const renderHeader = () => {
    if (pathname.includes("/create-job")) {
      return <CreateJobHeader />;
    }
  
    return <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />;
  };
  // 2. Fetch Profile Logic
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await axios.get(`${API_BASE_URL}/api/employer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_BASE_URL, router, handleLogout]);

  // 3. Responsive Logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 4. Menu Items Config
  const menuItems = [
    {
      key: "/auth/employer/dashboard",
      icon: <LayoutDashboard />,
      label: <Link href='/auth/employer/dashboard'>Dashboard</Link>,
    },
    {
      key: "/auth/employer/dashboard/job-post",
      icon: <BriefcaseBusiness />,
      label: <Link href='/auth/employer/dashboard/job-post'>Posts</Link>,
    },
    {
      key: "/auth/employer/dashboard/company-profile",
      icon: <Users />,
      label: <Link href='/auth/employer/dashboard/applicants'>Applicants</Link>,
    },
    {
      key: "/auth/employer/dashboard/account-settings",
      icon: <CalendarCheck />,
      label: (
        <Link href='/auth/employer/dashboard/account-settings'>Interviews</Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/subscriptions-billing",
      icon: <Database />,
      label: (
        <Link href='/auth/employer/dashboard/subscriptions-billing'>
          Talent Pool
        </Link>
      ),
    },
    {
      key: "/auth/employer/dashboard/marketplace",
      icon: <Settings />,
      label: <Link href='/auth/employer/dashboard/marketplace'>Settings</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#4850e5" },
        components: {
          Menu: { itemSelectedBg: "#4850e512", itemSelectedColor: "#4850e5" },
          Input: {
        activeBorderColor: "transparent", 
        hoverBorderColor: "transparent",  
        activeShadow: "none",             
      },
      Button: {
        controlOutline: "none", 
         activeBorderColor: "none", 
        hoverBorderColor: "none",  
        activeShadow: "none", 
      },
      Select: {
        controlOutline: "none",
      }
        },

      }}>
      <div className='flex h-screen overflow-hidden bg-[#f6f6f8]'>
        {/* Mobile Overlay */}
        {!collapsed && isMobile && (
          <div
            className='fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity'
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full bg-white border-r border-[#e8e8f3] z-50 flex flex-col transition-all duration-300 ${
            collapsed
              ? "-translate-x-full lg:translate-x-0 lg:w-20"
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
                  Employer
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className='flex-1 overflow-y-auto py-4'>
            <Menu
              mode='inline'
              selectedKeys={[pathname]} // 🔹 Automatically highlights based on URL
              items={menuItems}
              className='!border-none !bg-transparent px-3 [&_.ant-menu-item]:!h-11 [&_.ant-menu-item]:!rounded-lg [&_.ant-menu-item]:!text-[#505495]'
            />
          </div>

          <div className='flex items-center gap-3 cursor-pointer group p-4 border-t border-[#e8e8f3]'>
            {loading ? (
              <Spin size='small' />
            ) : (
              <>
                <Avatar
                  size={40}
                  src={profile?.profilePicture}
                  icon={<UserOutlined />}
                  className='border-2 border-white shadow-sm'
                />
                <div className='flex justify-end flex-col text-right  sm:block'>
                  <span className='text-sm font-bold text-[#0e0f1b]'>
                    {profile?.name || "User"}
                  </span>
                  <br />
                  <span className='text-[11px] text-[#505495] font-medium uppercase'>
                    {profile?.email || "Company"}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Sign Out */}
          <div className='p-4 border-t border-[#e8e8f3]'>
            <button
              onClick={handleLogout}
              className='flex items-center gap-3 w-full px-4 py-3 text-[#505495] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium group'>
              <LogoutOutlined className='text-lg' />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Area */}
        <div className='flex flex-col flex-1 min-w-0'>

          {renderHeader()}
          <main className='flex-1 overflow-y-auto p-6 md:p-8'>
            <div className='max-w-full mx-auto'>{children}</div>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default EmployerDashboard;
