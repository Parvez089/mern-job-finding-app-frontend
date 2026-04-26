/** @format */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  RadiusSettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Spin, ConfigProvider } from "antd";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Database,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import DashboardHeader from "@/app/components/employer/dashboard/DashboardHeader";
import CreateJobHeader from "@/app/components/employer/createJob/CreateJobHeader";

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
  const pathname = usePathname();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setProfile(null);
    router.replace("/");
  }, [router]);

  const renderHeader = () => {
    if (pathname.includes("/create-job")) return <CreateJobHeader />;
    return <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />;
  };

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

  const menuItems = [
    {
      key: "/auth/employer/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: <Link href="/auth/employer/dashboard">Dashboard</Link>,
    },
    {
      key: "/auth/employer/dashboard/job-post",
      icon: <BriefcaseBusiness size={18} />,
      label: <Link href="/auth/employer/dashboard/job-post">Posts</Link>,
    },
    {
      key: "/auth/employer/dashboard/applicants",
      icon: <Users size={18} />,
      label: <Link href="/auth/employer/dashboard/applicants">Applicants</Link>,
    },
    {
      key: "/auth/employer/dashboard/account-settings",
      icon: <CalendarCheck size={18} />,
      label: <Link href="/auth/employer/dashboard/account-settings">Interviews</Link>,
    },
    {
      key: "/auth/employer/dashboard/subscriptions-billing",
      icon: <Database size={18} />,
      label: <Link href="/auth/employer/dashboard/subscriptions-billing">Talent Pool</Link>,
    },
    {
      key: "/auth/employer/dashboard/marketplace",
      icon: <Settings size={18} />,
      label: <Link href="/auth/employer/dashboard/marketplace">Settings</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#0077b6" },
        components: {
          Menu: {
            itemSelectedBg: "#eff6ff",
            itemSelectedColor: "#0077b6",
            itemHoverBg: "#f8fafc",
            itemHoverColor: "#0077b6",
          },
          Input: {
            activeBorderColor: "#0077b6",
            hoverBorderColor: "#93c5fd",
          },
          Button: { colorPrimary: "#0077b6" },
          Select: { controlOutline: "none" },
        },
      }}
    >
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">

        {/* Mobile overlay */}
        {!collapsed && isMobile && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* ── Sidebar ───────────────────────── */}
        <aside
          className={`
            flex flex-col bg-white border-r border-slate-100
            shadow-[1px_0_8px_rgba(0,0,0,0.04)]
            transition-all duration-300 z-50 flex-shrink-0
            ${isMobile
              ? `fixed top-0 left-0 h-full ${collapsed ? "-translate-x-full" : "translate-x-0"} w-64`
              : `static h-full ${collapsed ? "w-[72px]" : "w-60"}`
            }
          `}
        >
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-100 overflow-hidden flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0077b6] to-[#4f46e5] flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <RadiusSettingOutlined className="text-base" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="font-extrabold text-[#0f172a] text-base leading-tight whitespace-nowrap">
                  Job<span className="text-[#0077b6]">Orbit</span>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Employer
                </div>
              </div>
            )}
          </div>

          {/* Nav label */}
          {!collapsed && (
            <div className="px-5 pt-4 pb-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Main Menu
            </div>
          )}

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-2 px-2">
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
              inlineCollapsed={collapsed}
              className="!border-none !bg-transparent [&_.ant-menu-item]:!rounded-lg [&_.ant-menu-item]:!my-0.5 [&_.ant-menu-item]:!h-10 [&_.ant-menu-item]:!leading-10 [&_.ant-menu-item]:!font-medium [&_.ant-menu-item]:!text-slate-500"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 p-4 border-t border-slate-100 overflow-hidden flex-shrink-0">
            {loading ? (
              <Spin size="small" />
            ) : (
              <>
                <Avatar
                  size={36}
                  src={profile?.profilePicture}
                  icon={<UserOutlined />}
                  className="flex-shrink-0 border-2 border-blue-100"
                />
                {!collapsed && (
                  <div className="overflow-hidden flex-1">
                    <div className="text-sm font-bold text-[#0f172a] truncate">
                      {profile?.name || "User"}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {profile?.email || ""}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sign Out */}
          <div className="p-3 border-t border-slate-100 flex-shrink-0">
            <button
              onClick={handleLogout}
              className={`
                flex items-center gap-3 w-full px-3 py-2.5
                rounded-lg text-slate-400 hover:text-red-500
                hover:bg-red-50 transition-all font-semibold text-sm
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <LogoutOutlined className="text-base flex-shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* ── Main Content ──────────────────── */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {renderHeader()}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default EmployerDashboard;