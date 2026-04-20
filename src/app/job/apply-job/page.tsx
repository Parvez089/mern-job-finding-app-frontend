"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Form, Input, Button, message, Upload, Divider, Card, Space } from "antd";
import { PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// Types
type ExperienceItem = { company?: string; role?: string; duration?: string };
type EducationItem = { degree?: string; institute?: string; year?: string };

type FieldType = {
  appId?: string;
  applicantId?: string;
  name?: string;
  email?: string;
  phone?: string;
  resumeUrl?: string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  address?: { city?: string; state?: string; zip?: string };
};

const ApplyJobForm = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();
  const params = useSearchParams();
  const [form] = Form.useForm<FieldType>();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please login first!");
      router.push("/auth/job-seeker/login");
      return;
    }

    const jobId = params.get("jobId");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user._id || user.id || "";

    form.setFieldsValue({
      appId: jobId || "",
      applicantId: userId,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      resumeUrl: user.resumeUrl || "",
    });
  }, [params, form, router]);

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("appId", values.appId || "");
      formData.append("applicantId", values.applicantId || "");
      formData.append("name", values.name || "");
      formData.append("email", values.email || "");
      formData.append("phone", values.phone || "");
      formData.append("experience", JSON.stringify(values.experience || []));
      formData.append("education", JSON.stringify(values.education || []));
      formData.append("address", JSON.stringify(values.address || {}));

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else if (values.resumeUrl) {
        formData.append("resumeUrl", values.resumeUrl);
      }

      const response = await axios.post(`${API_BASE_URL}/api/applications`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(response.data.message || "Applied successfully!");
      router.push("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <Card className="max-w-3xl w-full shadow-md">
        <h1 className="text-3xl text-center font-bold mb-8">Apply for Job</h1>

        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish}
          initialValues={{ experience: [], education: [] }}
        >
          <Form.Item name="appId" hidden><Input /></Form.Item>
          <Form.Item name="applicantId" hidden><Input /></Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Name is required' }]}>
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </div>

          <Form.Item name="phone" label="Phone Number">
            <Input placeholder="+8801XXXXXXXXX" />
          </Form.Item>

          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <Form.Item label="Upload Resume (PDF preferred)">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                onRemove={() => setResumeFile(null)}
                onChange={(info) => setResumeFile(info.fileList[0]?.originFileObj || null)}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="resumeUrl" label="Or Portfolio/Resume Link">
              <Input placeholder="https://drive.google.com/..." />
            </Form.Item>
          </div>

          {/* Dynamic Sections */}
          <SectionHeader title="Experience" />
          <Form.List name="experience">
            {(fields, { add, remove }) => (
              <DynamicField fields={fields} add={add} remove={remove} type="exp" />
            )}
          </Form.List>

          <SectionHeader title="Education" />
          <Form.List name="education">
            {(fields, { add, remove }) => (
              <DynamicField fields={fields} add={add} remove={remove} type="edu" />
            )}
          </Form.List>

          <Divider>Current Address</Divider>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item name={["address", "city"]} label="City"><Input /></Form.Item>
            <Form.Item name={["address", "state"]} label="State"><Input /></Form.Item>
            <Form.Item name={["address", "zip"]} label="Zip Code"><Input /></Form.Item>
          </div>

          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large" 
            loading={loading}
            className="mt-6 h-12 text-lg"
          >
            Submit Application
          </Button>
        </Form>
      </Card>
    </div>
  );
};

// Helper Components
const SectionHeader = ({ title }: { title: string }) => <Divider orientation="left">{title}</Divider>;

const DynamicField = ({ fields, add, remove, type }: any) => (
  <>
    {fields.map((field: any) => (
      <div key={field.key} className="bg-gray-50 p-4 mb-4 rounded-lg border relative border-dashed">
        <MinusCircleOutlined 
          className="absolute right-4 top-4 text-red-500 text-lg hover:scale-110 transition-transform" 
          onClick={() => remove(field.name)} 
        />
        {type === "exp" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
            <Form.Item label="Company" name={[field.name, "company"]}><Input /></Form.Item>
            <Form.Item label="Role" name={[field.name, "role"]}><Input /></Form.Item>
            <Form.Item label="Duration" name={[field.name, "duration"]}><Input /></Form.Item>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
            <Form.Item label="Degree" name={[field.name, "degree"]}><Input /></Form.Item>
            <Form.Item label="Institute" name={[field.name, "institute"]}><Input /></Form.Item>
            <Form.Item label="Year" name={[field.name, "year"]}><Input /></Form.Item>
          </div>
        )}
      </div>
    ))}
    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="mb-6">
      Add {type === "exp" ? "Experience" : "Education"}
    </Button>
  </>
);

// Main Component with Suspense
export default function ApplyJob() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading Form...</div>}>
      <ApplyJobForm />
    </Suspense>
  );
}