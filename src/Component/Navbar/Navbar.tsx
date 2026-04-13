/** @format */
"use client";

import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";

interface DecodedToken {
  role: string;
  name: string;
  exp: number;
}

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { key: "home",     label: "Home",        href: "/"        },
    { key: "about",    label: "About",       href: "/about"   },
    { key: "services", label: "Services",    href: "/services"},
    { key: "talent",   label: "Find Talent", href: "/talent"  },
  ];

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setVisible(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) setUserData(decoded);
        else localStorage.removeItem("token");
      } catch { localStorage.removeItem("token"); }
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDashboardRedirect = () => {
    if (!userData) { router.push("/auth"); return; }
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
    <header style={{
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #f1f5f9" : "1px solid transparent",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.25s ease",
      position: "relative", zIndex: 50, width: "100%",
    }}>
      <style>{`
        .nav-link { transition: color 0.15s ease; text-decoration: none; }
        .nav-link:hover { color: #0077b6 !important; }
        .nav-btn { transition: all 0.18s ease; cursor: pointer; }
        .nav-btn:hover { background: #f0f7ff !important; color: #0077b6 !important; }
      `}</style>

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "13px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg, #0077b6, #4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 900, color: "#fff",
          }}>J</div>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
            Job<span style={{ color: "#0077b6" }}>Orbit</span>
          </span>
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.key} href={link.href} className="nav-link" style={{
                  padding: "6px 14px", borderRadius: 8,
                  fontSize: "0.88rem", fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#0077b6" : "#64748b",
                  background: isActive ? "#e8f4fd" : "transparent",
                }}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Desktop auth */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {userData ? (
              <>
                <button className="nav-btn" onClick={handleDashboardRedirect} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 8,
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                  color: "#475569", fontSize: "0.85rem", fontWeight: 600,
                }}>
                  <LayoutDashboard size={14} /> {userData.name}
                </button>
                <button onClick={handleLogout} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 8,
                  background: "#fff5f5", border: "1px solid #fecaca",
                  color: "#ef4444", fontSize: "0.85rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s ease",
                }}>
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push("/auth/job-seeker/login")} style={{
                  padding: "7px 16px", borderRadius: 8,
                  background: "transparent", border: "1px solid #e2e8f0",
                  color: "#475569", fontSize: "0.88rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s ease",
                }}>
                  Log in
                </button>
                <button onClick={() => router.push("/auth")} style={{
                  padding: "7px 16px", borderRadius: 8,
                  background: "#0077b6", border: "none",
                  color: "#fff", fontSize: "0.88rem", fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,119,182,0.3)",
                  transition: "all 0.15s ease",
                }}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setVisible(true)} style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 8, padding: "6px 10px",
            color: "#475569", cursor: "pointer",
          }}>
            <MenuOutlined style={{ fontSize: 18 }} />
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer placement="right" onClose={() => setVisible(false)} open={visible}
        closable={false} width={260}
        styles={{ body: { padding: 0, background: "#fff" } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0f172a" }}>
            Job<span style={{ color: "#0077b6" }}>Orbit</span>
          </span>
          <button onClick={() => setVisible(false)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}>
            <CloseOutlined style={{ color: "#64748b" }} />
          </button>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href} onClick={() => setVisible(false)} style={{
              padding: "10px 12px", borderRadius: 8,
              fontSize: "0.9rem", fontWeight: 500, color: "#475569",
              textDecoration: "none", display: "block",
            }}>
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 8 }}>
          {userData ? (
            <>
              <button onClick={() => { handleDashboardRedirect(); setVisible(false); }} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", fontWeight: 600, cursor: "pointer" }}>
                {userData.name} · Dashboard
              </button>
              <button onClick={() => { handleLogout(); setVisible(false); }} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#fff5f5", border: "1px solid #fecaca", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { router.push("/auth/job-seeker/login"); setVisible(false); }} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", fontWeight: 600, cursor: "pointer" }}>
                Log in
              </button>
              <button onClick={() => { router.push("/auth"); setVisible(false); }} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#0077b6", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;