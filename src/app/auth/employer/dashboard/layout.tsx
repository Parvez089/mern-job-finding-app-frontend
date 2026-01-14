/** @format */
"use client";
import React, { useEffect, useState } from "react";
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
import { Menu, Avatar, Badge } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DecodedToken {
  role: string;
  name: string;
  exp: number;
}

const EmployerDashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const router = useRouter();

  // Detect Mobile and handle sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
      else setCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      
      {/* 🔹 MOBILE OVERLAY */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* 🔹 SIDEBAR (Background #FFFFFF) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-[#FFFFFF] border-r border-[#e8e8f3] 
        z-50 flex flex-col transition-all duration-300 shadow-sm
        ${collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"}`}
      >
        {/* BRANDING / LOGO */}
        <div className="h-20 flex items-center px-6 gap-3 overflow-hidden whitespace-nowrap">
          <div className="bg-[#4850e5] min-w-[40px] h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <RadiusSettingOutlined className="text-xl" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-[#0e0f1b] font-bold text-lg leading-tight">JobOrbit</h1>
              <p className="text-[#505495] text-[10px] font-semibold uppercase tracking-wider">Employer</p>
            </div>
          )}
        </div>

        {/* NAVIGATION MENU */}
        <div className="flex-1 overflow-y-auto py-4">
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectable={true}
            defaultSelectedKeys={["1"]}
            /* CUSTOM OVERRIDES FOR WHITE BACKGROUND AND TEXT #505495 */
            className={`
              !border-none !bg-transparent px-3
              [&_.ant-menu-item]:!text-[#505495] 
              [&_.ant-menu-item]:!font-medium
              [&_.ant-menu-item]:!h-11
              [&_.ant-menu-item]:!rounded-lg
              [&_.ant-menu-item-selected]:!bg-[#4850e512] 
              [&_.ant-menu-item-selected]:!text-[#4850e5]
              [&_.ant-menu-item:hover]:!text-[#4850e5]
              [&_.ant-menu-item-icon]:!text-lg
            `}
            items={[
              { key: "1", icon: <UnorderedListOutlined />, label: <Link href="/auth/employer/dashboard/">Dashboard</Link> },
              { key: "2", icon: <VideoCameraOutlined />, label: <Link href="/auth/employer/dashboard/job-post">Post a job</Link> },
              { key: "3", icon: <UsergroupAddOutlined />, label: <Link href="/auth/employer/dashboard/company-profile">Employer Profile</Link> },
              { key: "4", icon: <RadiusSettingOutlined />, label: <Link href="/auth/employer/dashboard/account-settings">Account Settings</Link> },
              { key: "5", icon: <AccountBookOutlined />, label: <Link href="/auth/employer/dashboard/subscriptions-billing">Subscriptions</Link> },
              { key: "6", icon: <ShoppingCartOutlined />, label: <Link href="/auth/employer/dashboard/marketplace">Marketplace</Link> },
              { key: "7", icon: <ContactsOutlined />, label: <Link href="/auth/employer/dashboard/contact">Contact Support</Link> },
            ]}
          />
        </div>

        {/* SIGN OUT SECTION */}
        <div className="p-4 border-t border-[#e8e8f3]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#505495] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium text-sm group"
          >
            <LogoutOutlined className="text-lg group-hover:scale-110 transition-transform" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 🔹 MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#e8e8f3] px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#505495]"
            >
              {collapsed ? <MenuUnfoldOutlined className="text-xl" /> : <MenuFoldOutlined className="text-xl" />}
            </button>
            <h2 className="text-xl font-bold text-[#0e0f1b] hidden md:block">Dashboard Overview</h2>
          </div>

          {/* TOP RIGHT ACTIONS */}
          <div className="flex items-center gap-6">
            <Badge dot color="#ef4444" offset={[-2, 2]}>
              <div className="p-2 bg-gray-50 rounded-full text-[#505495] cursor-pointer hover:bg-gray-100 transition-colors">
                <NotificationFilled className="text-lg" />
              </div>
            </Badge>

            <div className="h-8 w-[1px] bg-[#e8e8f3]"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#0e0f1b] group-hover:text-[#4850e5] transition-colors">Alex Rivera</p>
                <p className="text-[11px] text-[#505495] font-medium uppercase tracking-tight">TechFlow Inc</p>
              </div>
              <Avatar 
                size={40} 
                className="bg-indigo-100 !text-[#4850e5] font-bold border-2 border-white shadow-sm"
                icon={<UserOutlined />}
              />
            </div>
          </div>
        </header>

        {/* PAGE DYNAMIC CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;