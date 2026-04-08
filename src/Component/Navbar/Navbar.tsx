/** @format */

"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
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
    {
      key: "home",
      label: (
        <Link href="/" className="!text-white/80 hover:!text-white transition-colors">
          Home
        </Link>
      ),
    },
    {
      key: "about",
      label: (
        <Link href="/about" className="!text-white/80 hover:!text-white transition-colors">
          About
        </Link>
      ),
    },
    {
      key: "services",
      label: (
        <Link href="/services" className="!text-white/80 hover:!text-white transition-colors">
          Services
        </Link>
      ),
    },
    {
      key: "talent",
      label: (
        <Link href="/talent" className="!text-white/80 hover:!text-white transition-colors">
          Find Talent
        </Link>
      ),
    },
  ];

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setVisible(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/[0.08]"
      style={{
        background: "rgba(10, 22, 40, 0.60)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-12 py-3">

        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-tight shrink-0">
          <Link href="/">JobOrbit</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="
              !border-none !bg-transparent !shadow-none
              [&_.ant-menu-item]:!bg-transparent
              [&_.ant-menu-item-selected]:!bg-transparent
              [&_.ant-menu-item::after]:!border-b-cyan-400
              [&_.ant-menu-item-selected_.ant-menu-title-content_a]:!text-white
              [&_.ant-menu-item:hover]:!bg-transparent
            "
          />
        </div>

        {/* Desktop Actions */}
        {!isMobile && (
          <div className="shrink-0">
            {userData ? (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDashboardRedirect}
                  className="
                    !border !border-white/30 !bg-white/10 !text-white
                    !font-medium hover:!bg-white/20 transition-all
                    !rounded-lg !text-sm
                  "
                >
                  {userData.name}
                </Button>
                <Button
                  onClick={handleLogout}
                  className="
                    !border !border-red-400/50 !bg-red-500/20 !text-red-300
                    hover:!bg-red-500/40 hover:!text-white transition-all
                    !rounded-lg !text-sm
                  "
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/auth")}
                className="
                  !border !border-white/30 !bg-transparent !text-white
                  !font-semibold hover:!bg-white/10 transition-all
                  !rounded-lg !text-sm !px-5
                "
              >
                Get Started
              </Button>
            )}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined className="!text-white text-xl" />}
            onClick={() => setVisible(true)}
            className="!bg-transparent !border-none"
          />
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        closable={false}
        styles={{
          body: {
            background: "rgba(10, 22, 40, 0.97)",
            padding: "24px 16px",
          },
        }}
      >
        <div className="text-2xl font-bold text-white mb-6 px-2">
          JobOrbit
        </div>

        <Menu
          mode="vertical"
          items={menuItems}
          className="
            !border-none !bg-transparent
            [&_.ant-menu-item]:!bg-transparent
            [&_.ant-menu-item:hover]:!bg-white/10
            [&_.ant-menu-item-selected]:!bg-white/10
          "
        />

        <div className="mt-6 px-2 flex flex-col gap-3">
          {userData ? (
            <>
              <Button
                onClick={() => { handleDashboardRedirect(); setVisible(false); }}
                className="
                  w-full !border !border-white/30 !bg-white/10 !text-white
                  !font-medium hover:!bg-white/20 !rounded-lg
                "
              >
                {userData.name}
              </Button>
              <Button
                onClick={() => { handleLogout(); setVisible(false); }}
                className="
                  w-full !border !border-red-400/50 !bg-red-500/20 !text-red-300
                  hover:!bg-red-500/40 hover:!text-white !rounded-lg
                "
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => { router.push("/auth"); setVisible(false); }}
              className="
                w-full !border !border-white/30 !bg-transparent !text-white
                !font-semibold hover:!bg-white/10 !rounded-lg
              "
            >
              Get Started
            </Button>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;