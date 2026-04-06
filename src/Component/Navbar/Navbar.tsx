/** @format */

"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DecodedToken {
  role: string;
  name: string;
  exp: number;
}

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<DecodedToken | null>(null);

  const router = useRouter();

  const menuItems = [
    { key: "home", label: <Link href='/'>Home</Link> },
    { key: "about", label: <Link href='/about'>About</Link> },
    {
      key: "services",
      label: <Link href='/services'>Services</Link>,
    },
    {
      key: "talent",
      label: <Link href='/talent'>Find Talent</Link>,
    },
    
  ];

  // ✅ Handle Responsive Menu + Decode Token
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setVisible(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // ✅ Check token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        // ✅ Check token expiry
        if (decoded.exp * 1000 > Date.now()) {
          setUserData(decoded);
        } else {
          localStorage.removeItem("token");
          setUserData(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Role-based dashboard redirect
  const handleDashboardRedirect = () => {
    if (!userData) {
      router.push("/auth");
      return;
    }

    const { role } = userData;

    if (role === "jobseeker") router.push("/auth/job-seeker/dashboard");
    else if (role === "employer") router.push("/auth/employer/dashboard");
    else if (role === "admin") router.push("/auth/admin/dashboard");
    else router.push("/auth");
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <header className='  flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 w-full  bg-[var(--bg-primary)]'>
      <div className='w-full flex  justify-between items-center px-4 sm:px-1 lg:px-8 py-3 '>
        <div className='text-2xl font-semibold text-[var(--text-color)] tracking-tight'>
          <Link href='/'>JobOrbit</Link>
        </div>
        <div className='hidden md:flex items-center !border-b-none !shadow-none  gap-2 sm:gap-5 custom-menu'>
          <Menu
            mode='horizontal'
            items={menuItems}
            className=' !border-none !bg-transparent  flex justify-center w-full text-black'
          />
        </div>

        {!isMobile && (
          <div>
            {userData ? (
              <div className='flex items-center gap-3'>
                <Button
                  className='border-dashed!  border-(--bg-color) text-(--primary-text) text-sm sm:text-base shadow'
                  onClick={handleDashboardRedirect}>
                  {userData.name}
                </Button>
                <Button
                  className='bg-red-500! !hover:bg-red-600 !text-[var(--text-color)]'
                  onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className='!border-dashed !border-[var(--text-color)] !bg-transparent  !text-[var(--text-color)] !font-semibold  text-sm sm:text-base shadow'
                onClick={() => router.push("/auth")}>
                Get Started
              </Button>
            )}
          </div>
        )}

        {isMobile && (
          <Button
            type='text'
            icon={<MenuOutlined className='text-black text-2xl' />}
            onClick={() => setVisible(true)}
          />
        )}

        <Drawer
          placement='right'
          onClose={() => setVisible(false)}
          open={visible}
          closable={false}>
          <Menu mode='vertical' items={menuItems} className='border-none' />
          {userData ? (
            <div className='flex flex-col gap-2'>
              <Button
                className='w-full mt-4 !border-gray-300 !text-black'
                onClick={handleDashboardRedirect}>
                {userData.name}
              </Button>
              <Button
                className='w-full mt-2 !bg-red-500 !border-none !text-white'
                onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className='w-full mt-4'
              onClick={() => router.push("/auth")}>
              Get Started
            </Button>
          )}
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
