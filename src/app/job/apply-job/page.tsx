/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload, Divider } from "antd";
import { PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type AddressType = {
  city?: string;
  state?: string;
  zip?: string;
};

type ExperienceItem = {
  company?: string;
  role?: string;
  duration?: string;
};

type EducationItem = {
  degree?: string;
  institute?: string;
  year?: string;
};

type FieldType = {
  appId?: string;
  applicantId?: string;
  name?: string;
  email?: string;
  phone?: string;
  resume?: File | string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  address?: AddressType;
};

const ApplyJob = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useSearchParams();

  const jobId = params.get("jobId");

  const [initialData, setInitialData] = useState({});

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setInitialData({
      appId: jobId,
      applicantId: user._id,
    })
  }, [jobId]);
  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("appId", values.appId || "");
      formData.append("applicantId", values.applicantId || "");
      formData.append("name", values.name || "");
      formData.append("email", values.email || "");
      formData.append("phone", values.phone || "");

      // Resume
      if (values.resume instanceof File) {
        formData.append("resume", values.resume);
      }

      // Experience JSON
      formData.append("experience", JSON.stringify(values.experience || []));
      formData.append("education", JSON.stringify(values.education || []));
      formData.append("address", JSON.stringify(values.address || {}));

      const res = await axios.post(`${API_BASE_URL}api/job-applications`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(res.data.message);
      window.location.href = "/";
    } catch (error: any) {
      message.error(error.response?.data?.message || "Submission failed!");
    }
  };

  return (
    <div className="flex flex-col mt-5 justify-center items-center px-4 mb-5">
      <div className="bg-white px-6 py-10 rounded-lg shadow max-w-3xl w-full">
        <h1 className="text-3xl text-center font-bold">Apply Job</h1>

        <Form layout="vertical" onFinish={onFinish} initialValues={initialData} className="mt-6">

          {/* App ID */}
          <Form.Item name="appId" label="Job ID" rules={[{ required: true }]}>
            <Input placeholder="Enter Job ID" />
          </Form.Item>

          {/* Applicant ID */}
          <Form.Item name="applicantId" label="Applicant ID" rules={[{ required: true }]}>
            <Input placeholder="Enter Applicant ID" />
          </Form.Item>

          {/* Name */}
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>

          {/* Phone */}
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

          {/* Resume Upload */}
          <Form.Item label="Upload Resume" name="resume" valuePropName="file">
            <Upload
              beforeUpload={(file) => {
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Resume</Button>
            </Upload>
          </Form.Item>

          {/* Experience Section */}
          <Divider>Experience</Divider>

          <Form.List name="experience">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border p-4 mb-3 rounded relative">
                    <MinusCircleOutlined
                      className="absolute right-3 top-3 text-red-500 cursor-pointer"
                      onClick={() => remove(name)}
                    />

                    <Form.Item
                      {...restField}
                      label="Company"
                      name={[name, "company"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Role"
                      name={[name, "role"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Duration"
                      name={[name, "duration"]}
                    >
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

          {/* Education Section */}
          <Divider>Education</Divider>

          <Form.List name="education">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border p-4 mb-3 rounded relative">
                    <MinusCircleOutlined
                      className="absolute right-3 top-3 text-red-500 cursor-pointer"
                      onClick={() => remove(name)}
                    />

                    <Form.Item
                      {...restField}
                      label="Degree"
                      name={[name, "degree"]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Institute"
                      name={[name, "institute"]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Year"
                      name={[name, "year"]}
                    >
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

          {/* Address Section */}
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

          {/* Submit */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 font-semibold"
          >
            Submit Application
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default ApplyJob;
