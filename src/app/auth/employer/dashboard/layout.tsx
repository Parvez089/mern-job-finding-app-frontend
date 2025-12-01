/** @format */
"use client";
import { Button, Menu } from "antd";
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
import Link from "next/link";
import { useRouter } from "next/navigation";


interface DecodedToken {
  role: string;
  name: string;
  exp: number;
}
const EmployerDashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<DecodedToken | null>(null);
const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768; // 👈 Mobile detect
      setIsMobile(mobile);
      if (mobile) setCollapsed(true); // 👈 Mobile হলে auto hide sidebar
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
    <div className="flex h-screen">

      {/* 🔹 MOBILE SIDEBAR OVERLAY (click করলে বন্ধ হবে) */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* 🔹 SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-[var(--bg-dashboard-color)] 
        w-64 z-50 shadow-lg transition-transform duration-300 
        ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}`}
      >
        {/* LOGO + CLOSE BUTTON */}
        <div className="flex justify-between items-center px-4 py-3">
          <h1 className="text-white text-2xl">LOGO</h1>
          
          {/*  Sidebar Close Button (only on mobile) */}
          {isMobile && (
            <MenuFoldOutlined
              className="text-white text-xl cursor-pointer"
              onClick={() => setCollapsed(true)}
            />
          )}
        </div>

        {/* MENU ITEMS */}
        <Menu
          className="bg-transparent [&_.ant-menu-item]:!text-white [&_.ant-menu-item-selected]:!bg-[#2a54b7]"
          mode="inline"
          items={[
            { key: "1", icon: <UnorderedListOutlined />, label: <Link href="/auth/employer/dashboard/">Dashboard</Link> },
            { key: "2", icon: <VideoCameraOutlined />, label: <Link href="/auth/employer/dashboard/job-post">Post a job</Link> },
            { key: "3", icon: <UsergroupAddOutlined />, label: <Link href="/auth/employer/dashboard/company-profile">Employer Profile</Link> },
            { key: "4", icon: <RadiusSettingOutlined />, label: <Link href="/auth/employer/dashboard/account-settings">Account Settings</Link> },
            { key: "5", icon: <AccountBookOutlined />, label: <Link href="/auth/employer/dashboard/subscriptions-billing">Subscriptions/Billing</Link> },
            { key: "6", icon: <ShoppingCartOutlined />, label: <Link href="/auth/employer/dashboard/marketplace">Job Orbit Marketplace</Link> },
            { key: "7", icon: <ContactsOutlined />, label: <Link   href="/auth/employer/dashboard/contact">Contact Support</Link> },
            { key: "8", label:<button  onClick={handleLogout}><LogoutOutlined /> Sign Out </button> ,  },
          ]}
        />
      </div>

      {/* 🔹 MAIN CONTENT + NAVBAR */}
      <div className="flex flex-col flex-1">

        {/* TOP NAVBAR */}
        <div className="bg-white h-16 flex justify-between items-center px-4 shadow-md">
          
          {/*  MOBILE MENU BUTTON */}
          {collapsed && isMobile && (
            <MenuUnfoldOutlined
              className="text-xl cursor-pointer"
              onClick={() => setCollapsed(false)}
            />
          )}

          <div className="flex gap-4">
            <NotificationFilled />
            <UserOutlined />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 overflow-y-auto h-full bg-[var(--bg-dashboard)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
