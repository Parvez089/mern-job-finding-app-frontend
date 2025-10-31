/** @format */

"use client";
import React, { useEffect, useState } from "react";
import {

  AccountBookOutlined,
  BellFilled,
  BellOutlined,
  CloudUploadOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SaveOutlined,
  ScheduleOutlined,

  SettingFilled
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Header, Sider, Content } = Layout;

const menuItems = [
              {
                key: "1",
                icon: <FileSearchOutlined />,
                label: (
                  <Link href='/'>
                    {" "}
                    Find Jobs{" "}
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <SaveOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/job-post'>
                    {" "}
                    Saved Jobs{" "}
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <ScheduleOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/company-profile'>
                    {" "}
                   Applied Jobs{" "}
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <CloudUploadOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/account-settings'>
                    {" "}
                    Resume Upload{" "}
                  </Link>
                ),
              },
              {
                key: "5",
                icon: <BellOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/subscriptions-billing'>
                    {" "}
                    Notifications{" "}
                  </Link>
                ),
              },
              {
                key: "6",
                icon: <SettingFilled />,
                label: (
                  <Link href='/auth/employer/dashboard/marketplace'>
                    {" "}
                    Settings{" "}
                  </Link>
                ),
              },
              
              { key: "8", icon: <LogoutOutlined />, label: "Sign Out" },
            ]
const JobSeekerDashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth <= 768) setCollapsed(true);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      {" "}
      <Layout className='min-h-screen'>
        {" "}
        <Sider
          className={`bg-[#001529] transition-all duration-300 ease-in-out z-100 
          ${isMobile ? "fixed" : "relative"} 
          ${collapsed ? "-left-full" : "left-0"} 
          min-h-screen`}
          trigger={null}
          collapsible
          collapsed={collapsed}>
          {" "}
          <div className='demo-logo-vertical mt-20' />{" "}
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />{" "}
        </Sider>{" "}
        <Layout
          className={`transition-all duration-300 ease-in-out ${
            isMobile ? "ml-0" : collapsed ? "ml-0" : "ml-2"
          }`}>
          {" "}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {" "}
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className='text-xl w-12 h-12 flex items-center justify-center'
            />{" "}
          </Header>{" "}
          <Content className='bg-white rounded-2xl mx-2 my-4 p-4 md:mx-4 md:p-6 min-h-[280px]'>
            {children}
          </Content>{" "}
        </Layout>{" "}
      </Layout>{" "}
    </div>
  );
};
export default JobSeekerDashboard ;
