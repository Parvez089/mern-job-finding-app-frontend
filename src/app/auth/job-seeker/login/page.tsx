/** @format */
"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Briefcase } from "lucide-react";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const JobSeekerLogin = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        ...values,
        role: "jobseeker",
      });

      const token = res.data.token;
      const user = res.data.user;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        message.success("Welcome back! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 600);
      } else {
        message.error("Invalid login response from server!");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 50%, #f5f0ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: fadeUp 0.5s ease both; }

        /* Ant Design overrides */
        .login-form .ant-form-item-label > label {
          font-size: 0.82rem !important;
          font-weight: 600 !important;
          color: #374151 !important;
          font-family: 'Inter', sans-serif !important;
        }
        .login-form .ant-input-affix-wrapper,
        .login-form .ant-input {
          border-radius: 10px !important;
          border: 1.5px solid #e2e8f0 !important;
          padding: 10px 14px !important;
          font-size: 0.88rem !important;
          font-family: 'Inter', sans-serif !important;
          background: #f8fafc !important;
          transition: all 0.15s ease !important;
        }
        .login-form .ant-input-affix-wrapper:hover,
        .login-form .ant-input:hover {
          border-color: #93c5fd !important;
          background: #fff !important;
        }
        .login-form .ant-input-affix-wrapper:focus,
        .login-form .ant-input-affix-wrapper-focused,
        .login-form .ant-input:focus {
          border-color: #0077b6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(0,119,182,0.1) !important;
        }
        .login-form .ant-form-item-explain-error {
          font-size: 0.75rem !important;
          font-family: 'Inter', sans-serif !important;
        }
        .login-form .ant-checkbox-wrapper {
          font-size: 0.82rem !important;
          color: #64748b !important;
          font-family: 'Inter', sans-serif !important;
        }
        .login-form .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #0077b6 !important;
          border-color: #0077b6 !important;
        }
        .login-submit-btn {
          transition: all 0.2s ease !important;
        }
        .login-submit-btn:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(0,119,182,0.35) !important;
          transform: translateY(-1px) !important;
        }
      `}</style>

      {/* Background blobs */}
      <div style={{
        position: "fixed", top: -80, right: -60,
        width: 450, height: 450,
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: -60, left: -40,
        width: 380, height: 380,
        background: "radial-gradient(circle, rgba(0,119,182,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Card */}
      <div className="login-card" style={{
        width: "100%", maxWidth: 440,
        background: "#ffffff",
        borderRadius: 20,
        padding: "40px 36px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
        border: "1px solid #f1f5f9",
        position: "relative", zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center",
            justifyContent: "center",
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg, #0077b6, #4f46e5)",
            marginBottom: 12,
            boxShadow: "0 4px 14px rgba(0,119,182,0.3)",
          }}>
            <Briefcase size={22} color="#fff" />
          </div>
          <div>
            <span style={{
              fontSize: "1.2rem", fontWeight: 800,
              color: "#0f172a", letterSpacing: "-0.02em",
            }}>
              Job<span style={{ color: "#0077b6" }}>Orbit</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{
            fontSize: "1.6rem", fontWeight: 800,
            color: "#0f172a", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 6,
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.5 }}>
            Sign in to your Job Seeker account on JobOrbit
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          name="jobseeker-login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="login-form"
          requiredMark={false}
        >
          {/* Email */}
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
            style={{ marginBottom: 16 }}
          >
            <Input
              prefix={<Mail size={15} color="#94a3b8" style={{ marginRight: 6 }} />}
              placeholder="you@example.com"
              size="large"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
            style={{ marginBottom: 12 }}
          >
            <Input.Password
              prefix={<Lock size={15} color="#94a3b8" style={{ marginRight: 6 }} />}
              placeholder="Your password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          {/* Remember + Forgot */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 24,
          }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Keep me signed in
              </Checkbox>
            </Form.Item>
            <Link href="/auth/job-seeker/forgot-password" style={{
              fontSize: "0.8rem", color: "#0077b6",
              fontWeight: 600, textDecoration: "none",
            }}>
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Form.Item noStyle>
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
              style={{
                width: "100%", padding: "12px",
                borderRadius: 11,
                background: loading
                  ? "rgba(0,119,182,0.6)"
                  : "linear-gradient(135deg, #0077b6 0%, #005f8e 100%)",
                border: "none", color: "#fff",
                fontSize: "0.95rem", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8,
                boxShadow: "0 4px 14px rgba(0,119,182,0.25)",
                transition: "all 0.2s ease",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </Form.Item>
        </Form>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: 10, margin: "20px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          <span style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", fontSize: "0.83rem", color: "#94a3b8", margin: 0 }}>
          Don't have an account?{" "}
          <Link href="/auth" style={{
            color: "#0077b6", fontWeight: 700,
            textDecoration: "none",
          }}>
            Create one here
          </Link>
        </p>

        {/* Back to jobs */}
        <p style={{ textAlign: "center", marginTop: 12, marginBottom: 0 }}>
          <Link href="/job" style={{
            fontSize: "0.78rem", color: "#cbd5e1",
            textDecoration: "none", fontWeight: 500,
          }}>
            ← Back to job listings
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JobSeekerLogin;