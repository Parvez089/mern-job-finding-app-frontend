/** @format */

"use client";
import React, { useEffect, useState } from "react";
import {
  AccountBookFilled,
  AccountBookOutlined,
  ContactsOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadiusSettingOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Header, Sider, Content } = Layout;
const EmployerDashboard = ({ children }: { children: React.ReactNode }) => {
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
            items={[
              {
                key: "1",
                icon: <UnorderedListOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/manage-listing'>
                    {" "}
                    Manage Listing{" "}
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/job-post'>
                    {" "}
                    Post a job{" "}
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <UsergroupAddOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/company-profile'>
                    {" "}
                    Company Profile{" "}
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <RadiusSettingOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/account-settings'>
                    {" "}
                    Account Settings{" "}
                  </Link>
                ),
              },
              {
                key: "5",
                icon: <AccountBookOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/subscriptions-billing'>
                    {" "}
                    Subscriptions/Billing{" "}
                  </Link>
                ),
              },
              {
                key: "6",
                icon: <ShoppingCartOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/marketplace'>
                    {" "}
                    Job orbit Marketplace{" "}
                  </Link>
                ),
              },
              {
                key: "7",
                icon: <ContactsOutlined />,
                label: (
                  <Link href='/auth/employer/dashboard/contact'>
                    {" "}
                    Contact Support{" "}
                  </Link>
                ),
              },
              { key: "8", icon: <LogoutOutlined />, label: "Sign Out" },
            ]}
          />{" "}
        </Sider>{" "}
        <Layout
          className={`transition-all duration-300 ease-in-out ${
            isMobile ? "ml-0" : collapsed ? "ml-20" : "ml-52"
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
export default EmployerDashboard;
