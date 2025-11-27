"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Upload, Divider } from "antd";
import { PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

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

const ApplyJob = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();
  const params = useSearchParams();
  const [form] = Form.useForm<FieldType>();
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    
     const token = localStorage.getItem("token");
     console.log(token)
     console.log(token)
     if (!token) {
    message.error("Please login first!");
    router.push("/auth/job-seeker/login");
    return;
  }

  const jobId = params.get("jobId");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(jobId)
    console.log(user)
    const userId = user._id || user.id || "";
    form.setFieldsValue({
      appId: jobId || "",
      applicantId:  userId,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      experience: [],
      resumeUrl: user.resumeUrl || "",
      education: [],
      address: { city: "", state: "", zip: "" },
    });
  }, [params, form]);

const onFinish = async (values: FieldType) => {

  console.log(values)
  try {
    const token = localStorage.getItem("token");

    if (!values.appId || !values.applicantId || !values.name) {
      message.error("Job ID, Applicant ID & Name are required");
      return;
    }

    const formData = new FormData();
    formData.append("appId", values.appId!);
    formData.append("applicantId", values.applicantId!);
    formData.append("name", values.name!);
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

    const response = await axios.post(`${API_BASE_URL}/api/applications`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // must be multipart
        },
      }
    );

    message.success(response.data.message);
    router.push("/");

  } catch (error: any) {
    console.error("UPLOAD ERROR → ", error);
    message.error(error.response?.data?.message || "Submission failed!");
  }
};

  return (
    <div className="flex flex-col mt-5 justify-center items-center px-4 mb-5">
      <div className="bg-white px-6 py-10 rounded-lg shadow max-w-3xl w-full">
        <h1 className="text-3xl text-center font-bold mb-5">Apply Job</h1>

        <Form form={form} layout="vertical" onFinish={onFinish} 
        initialValues={{
    experience: [],
    education: [],
    address: { city: "", state: "", zip: "" },
    resumeUrl: "",
  }}
        >

          <Form.Item name="appId" hidden>
    <Input />
  </Form.Item>
  <Form.Item name="applicantId" hidden>
    <Input />
  </Form.Item>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

          <Form.Item label="Upload Resume">
            <Upload
              name="resumeFile"
              beforeUpload={() => false}
              maxCount={1}
              onChange={(info: any) => setResumeFile(info.fileList[0]?.originFileObj || null)}
            >
              <Button icon={<UploadOutlined />}>Upload Resume</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="resumeUrl" label="Or Resume URL">
            <Input placeholder="https://example.com/resume.pdf" />
          </Form.Item>

          <Divider>Experience</Divider>
          <Form.List name="experience">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key} className="border p-4 mb-3 rounded relative">
                    <MinusCircleOutlined className="absolute right-3 top-3 text-red-500 cursor-pointer" onClick={() => remove(field.name)} />
                    <Form.Item label="Company" name={[field.name, "company"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Role" name={[field.name, "role"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Duration" name={[field.name, "duration"]}>
                      <Input />
                    </Form.Item>
                  </div>
                ))}
                <Button icon={<PlusOutlined />} onClick={() => add()}>
                  Add Experience
                </Button>
              </>
            )}
          </Form.List>

          <Divider>Education</Divider>
          <Form.List name="education">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key} className="border p-4 mb-3 rounded relative">
                    <MinusCircleOutlined className="absolute right-3 top-3 text-red-500 cursor-pointer" onClick={() => remove(field.name)} />
                    <Form.Item label="Degree" name={[field.name, "degree"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Institute" name={[field.name, "institute"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Year" name={[field.name, "year"]}>
                      <Input />
                    </Form.Item>
                  </div>
                ))}
                <Button icon={<PlusOutlined />} onClick={() => add()}>
                  Add Education
                </Button>
              </>
            )}
          </Form.List>

          <Divider>Address</Divider>
          <Form.Item name={["address", "city"]} label="City">
            <Input />
          </Form.Item>
          <Form.Item name={["address", "state"]} label="State">
            <Input />
          </Form.Item>
          <Form.Item name={["address", "zip"]} label="Zip Code">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full mt-4 font-semibold">
            Submit Application
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ApplyJob;