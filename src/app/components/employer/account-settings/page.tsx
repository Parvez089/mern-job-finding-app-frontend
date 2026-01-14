"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import { GoogleCircleFilled } from "@ant-design/icons";
import {
  getEmployerProfile,
  updateEmployerProfile,
} from "@/app/services/employer";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  currentpassword?: string;
  newpassword?: string;
}

const AccountSettingComponents = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // ===============================
  // FETCH PROFILE
  // ===============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getEmployerProfile();
        const user = res.message;

        const nameParts = user?.name?.split(" ") || [];

        form.setFieldsValue({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
          phone: user.phone,
          email: user.email,
        });

        if (user?.ProfileImage?.secure_url) {
          setImageUrl(user.ProfileImage.secure_url);
        }
      } catch {
        message.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [form]);

  // ===============================
  // UPLOAD IMAGE
  // ===============================
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = ["image/jpeg", "image/png", "image/jpg"].includes(
        file.type
      );

      if (!isImage) {
        message.error("Only JPG/PNG images allowed");
        return Upload.LIST_IGNORE;
      }

      const isLt10MB = file.size / 1024 / 1024 < 10;
      if (!isLt10MB) {
        message.error("Image must be under 10MB");
        return Upload.LIST_IGNORE;
      }

      setFile(file);

      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);

      return false;
    },
    showUploadList: false,
  };

  // ===============================
  // SUBMIT FORM
  // ===============================
  const onFinish = async (values: ProfileFormValues) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "name",
        [values.firstName, values.lastName].filter(Boolean).join(" ")
      );

      formData.append("phone", values.phone);

      // disabled input workaround
      formData.append("email", form.getFieldValue("email"));

      if (values.currentpassword && values.newpassword) {
        formData.append("currentpassword", values.currentpassword);
        formData.append("newpassword", values.newpassword);
      }

      if (file) {
        formData.append("file", file);
      }

      const res = await updateEmployerProfile(formData);

      if (res?.success) {
        message.success("Profile updated successfully");
        setFile(null);
      }
    } catch {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE IMAGE (UI ONLY)
  // ===============================
  const handleDeleteImage = () => {
    setImageUrl(null);
    setFile(null);
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="flex flex-col max-w-3xl w-full p-4">
      <h1 className="text-xl font-semibold">Account</h1>
      <p className="text-gray-500">
        Real-time information and activities of your account.
      </p>

      <Divider />

      {/* PROFILE IMAGE */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative w-[60px] h-[60px]">
            <Image
              fill
              alt="Profile"
              src={imageUrl ?? "https://via.placeholder.com/60"}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Profile picture</p>
            <p className="text-xs text-gray-500">
              JPG / PNG under 10MB
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Upload {...uploadProps}>
            <Button size="small">Upload</Button>
          </Upload>
          <Button size="small" danger onClick={handleDeleteImage}>
            Delete
          </Button>
        </div>
      </div>

      {/* FORM */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Divider />

        <Form.Item label="Current Password" name="currentpassword">
          <Input.Password />
        </Form.Item>

        <Form.Item label="New Password" name="newpassword">
          <Input.Password />
        </Form.Item>

        <Divider />

        <div className="flex justify-between items-center border p-3 rounded">
          <div className="flex items-center gap-3">
            <GoogleCircleFilled className="text-2xl text-red-500" />
            <div>
              <p className="font-semibold text-sm">Google</p>
              <p className="text-xs text-gray-500">
                Faster login method
              </p>
            </div>
          </div>
          <Button size="small">Connect</Button>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full mt-6!"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default AccountSettingComponents;
