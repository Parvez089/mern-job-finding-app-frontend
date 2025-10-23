"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // store role
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setVisible(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Get user role from token
     const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode<{ role: string }>(token); // named import ব্যবহার
      console.log(decoded, "decoded")
      setUserRole(decoded.role);
    } catch (err) {
      console.error("Invalid token", err);
      setUserRole(null);
    }
  }


    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDashboardRedirect = () => {
    if (userRole === "jobseeker") router.push("/jobseeker/dashboard");
    else if (userRole === "employer") router.push("/employer/dashboard");
    else if (userRole === "admin") router.push("/admin/dashboard");
    else router.push("/auth"); // fallback
  };
  console.log(handleDashboardRedirect)

  if (!mounted) return null;

  return (
    <header className="bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 md:w-full mb-8">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="text-2xl font-semibold text-[var(--primary-text)] tracking-tight">
          JobOrbit
        </div>

        {!isMobile && (
          <div className="flex items-center gap-2 sm:gap-5">
            <Menu
              theme="light"
              mode="horizontal"
              items={[
                { key: "home", label: <Link href="/">Home</Link> },
                { key: "about", label: <Link href="/about">About</Link> },
                { key: "services", label: <Link href="/services">Services</Link> },
                { key: "talent", label: <Link href="/talent">Find Talent</Link> },
                { key: "contact", label: <Link href="/contact">Contact</Link> },
              ]}
              className="bg-white !border-none text-sm sm:text-base"
            />
            <Input.Search
              onSearch={(value) => console.log(value)}
              placeholder="Find Jobs"
              style={{ width: 200 }}
            />

            <Button
              className="!border-dashed !border-[var(--bg-color)] text-[var(--primary-text)] !hover:text-[var(--primary-text)] text-sm sm:text-base shadow"
              onClick={handleDashboardRedirect}
            >
              {userRole ? "Dashboard" : "Get Started"}
            </Button>
          </div>
        )}

        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined className="text-black text-2xl" />}
            onClick={() => setVisible(true)}
          />
        )}

        <Drawer placement="right" onClose={() => setVisible(false)} open={visible} closable={false}>
          <Menu
            mode="vertical"
            items={[
              { key: "home", label: <Link href="/">Home</Link> },
              { key: "about", label: <Link href="/about">About</Link> },
              { key: "services", label: <Link href="/services">Services</Link> },
              { key: "talent", label: <Link href="/talent">Find Talent</Link> },
              { key: "contact", label: <Link href="/contact">Contact</Link> },
            ]}
            className="border-none"
          />
        </Drawer>
      </div>
    </header>
  );
};


export default Navbar;