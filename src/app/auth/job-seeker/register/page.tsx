/** @format */
"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Briefcase } from "lucide-react";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  remember?: boolean;
};

const JobSeekerRegister = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    if (!values.remember) {
      message.warning("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "jobseeker",
      });
      message.success(res.data.message || "Account created! Redirecting...");
      setTimeout(() => {
        window.location.href = "/auth/job-seeker/login";
      }, 700);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // ── Social auth handlers ──────────────────────────
  const handleGoogleAuth = () => {
    // Wire up your Google OAuth endpoint here
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const handleFacebookAuth = () => {
    window.location.href = `${API_BASE_URL}/api/auth/facebook`;
  };

  const handleAppleAuth = () => {
    window.location.href = `${API_BASE_URL}/api/auth/apple`;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 50%, #f5f0ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
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
        @keyframes spin { to { transform: rotate(360deg); } }

        .reg-card { animation: fadeUp 0.5s ease both; }

        .reg-form .ant-form-item-label > label {
          font-size: 0.82rem !important;
          font-weight: 600 !important;
          color: #374151 !important;
          font-family: 'Inter', sans-serif !important;
        }
        .reg-form .ant-input-affix-wrapper,
        .reg-form .ant-input {
          border-radius: 10px !important;
          border: 1.5px solid #e2e8f0 !important;
          padding: 10px 14px !important;
          font-size: 0.88rem !important;
          font-family: 'Inter', sans-serif !important;
          background: #f8fafc !important;
          transition: all 0.15s ease !important;
        }
        .reg-form .ant-input-affix-wrapper:hover,
        .reg-form .ant-input:hover {
          border-color: #93c5fd !important;
          background: #fff !important;
        }
        .reg-form .ant-input-affix-wrapper:focus,
        .reg-form .ant-input-affix-wrapper-focused,
        .reg-form .ant-input:focus {
          border-color: #0077b6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(0,119,182,0.1) !important;
        }
        .reg-form .ant-form-item-explain-error {
          font-size: 0.75rem !important;
          font-family: 'Inter', sans-serif !important;
        }
        .reg-form .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #0077b6 !important;
          border-color: #0077b6 !important;
        }
        .social-btn {
          transition: all 0.15s ease !important;
          cursor: pointer;
        }
        .social-btn:hover {
          border-color: #93c5fd !important;
          background: #f0f7ff !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        }
        .reg-submit:hover:not(:disabled) {
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
      <div className="reg-card" style={{
        width: "100%", maxWidth: 440,
        background: "#ffffff",
        borderRadius: 20,
        padding: "36px 36px 32px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
        border: "1px solid #f1f5f9",
        position: "relative", zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            display: "inline-flex", alignItems: "center",
            justifyContent: "center",
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg, #0077b6, #4f46e5)",
            marginBottom: 10,
            boxShadow: "0 4px 14px rgba(0,119,182,0.3)",
          }}>
            <Briefcase size={22} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              Job<span style={{ color: "#0077b6" }}>Orbit</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{
            fontSize: "1.5rem", fontWeight: 800,
            color: "#0f172a", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 6,
          }}>
            Create your account
          </h1>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5 }}>
            Join thousands of job seekers on JobOrbit
          </p>
        </div>

        {/* ── Social Auth Buttons ─────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>

          {/* Google */}
          <button className="social-btn" onClick={handleGoogleAuth} style={{
            width: "100%", padding: "10px 16px",
            borderRadius: 10, background: "#fff",
            border: "1.5px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontSize: "0.88rem", fontWeight: 600, color: "#374151",
            fontFamily: "'Inter', sans-serif",
          }}>
            {/* Google SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {/* Facebook */}
            <button className="social-btn" onClick={handleFacebookAuth} style={{
              flex: 1, padding: "10px 12px",
              borderRadius: 10, background: "#fff",
              border: "1.5px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: "0.82rem", fontWeight: 600, color: "#374151",
              fontFamily: "'Inter', sans-serif",
            }}>
              {/* Facebook SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>

            {/* Apple */}
            <button className="social-btn" onClick={handleAppleAuth} style={{
              flex: 1, padding: "10px 12px",
              borderRadius: 10, background: "#fff",
              border: "1.5px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: "0.82rem", fontWeight: 600, color: "#374151",
              fontFamily: "'Inter', sans-serif",
            }}>
              {/* Apple SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: 10, marginBottom: 20,
        }}>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          <span style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 600, letterSpacing: "0.05em" }}>
            OR CONTINUE WITH EMAIL
          </span>
          <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
        </div>

        {/* ── Registration Form ───────────────── */}
        <Form
          form={form}
          name="jobseeker-register"
          layout="vertical"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="off"
          className="reg-form"
          requiredMark={false}
        >
          {/* Full name */}
          <Form.Item
            label="Full name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            style={{ marginBottom: 14 }}
          >
            <Input
              prefix={<User size={15} color="#94a3b8" style={{ marginRight: 6 }} />}
              placeholder="Your full name"
              size="large"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
            style={{ marginBottom: 14 }}
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
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
            style={{ marginBottom: 16 }}
          >
            <Input.Password
              prefix={<Lock size={15} color="#94a3b8" style={{ marginRight: 6 }} />}
              placeholder="Min. 8 characters"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          {/* Terms checkbox */}
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: 20 }}
          >
            <Checkbox style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.5 }}>
              By signing up, I agree to JobOrbit's{" "}
              <Link href="/terms" style={{ color: "#0077b6", fontWeight: 600, textDecoration: "none" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ color: "#0077b6", fontWeight: 600, textDecoration: "none" }}>
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          {/* Submit */}
          <Form.Item noStyle>
            <button
              type="submit"
              className="reg-submit"
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </Form.Item>
        </Form>

        {/* Login link */}
        <p style={{ textAlign: "center", fontSize: "0.83rem", color: "#94a3b8", margin: "16px 0 0" }}>
          Already have an account?{" "}
          <Link href="/auth/job-seeker/login" style={{
            color: "#0077b6", fontWeight: 700, textDecoration: "none",
          }}>
            Sign in
          </Link>
        </p>

        {/* Back link */}
        <p style={{ textAlign: "center", marginTop: 10, marginBottom: 0 }}>
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

export default JobSeekerRegister;