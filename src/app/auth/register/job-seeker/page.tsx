/** @format */
"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { LinkedinFilled, GoogleCircleFilled } from "@ant-design/icons";
import axios from "axios";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const JobSeekerRegister = () => {
  const onFinish = async (values: FieldType) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...values,
        role: "jobseeker", // fixed role here
      });
      message.success(res.data.message);
      window.location.href = "/";
    } catch (error: any) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-white w-full max-w-lg px-6 sm:px-8 py-10 sm:py-12 rounded-xl shadow-lg'>
        {/* Title */}
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-2'>
          Create Your <br /> Job Seeker Account
        </h1>
        <p className='text-center text-gray-600 mb-6'>
          Sign up to create your Job Seeker Account on JobOrbit.
        </p>

        <Form
          name='jobseeker-register'
          layout='vertical'
          className='w-full'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          {/* Username */}
          <Form.Item<FieldType>
            label='name'
            name='name'
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input placeholder='Your name' />
          </Form.Item>

          {/* Email */}
          <Form.Item<FieldType>
            label='Email'
            name='email'
            rules={[{ required: true, message: "Please input your email!" }]}>
            <Input placeholder='Your Email' />
          </Form.Item>

          {/* Password */}
          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password placeholder='Password' />
          </Form.Item>

          {/* Terms */}
          <Form.Item<FieldType>
            name='remember'
            valuePropName='checked'
            className='mb-4'>
            <Checkbox className='text-sm text-gray-700'>
              By signing up, I agree to JobOrbits{" "}
              <span className='text-red-600 hover:underline'>
                Terms of Service
              </span>{" "}
              and{" "}
              <span className='text-red-600 hover:underline'>
                Privacy Policy
              </span>
              .
            </Checkbox>
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              htmlType='submit'
              className='w-full !bg-[var(--bg-color)] !text-white py-3 text-lg !font-semibold '>
              Continue
            </Button>
          </Form.Item>

          {/* Divider */}
          <Divider className='text-gray-400'>or sign up with</Divider>

          {/* Social Buttons */}
          <div className='flex justify-center items-center gap-6 mt-4'>
            <Button
              type='default'
              className='flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'>
              <GoogleCircleFilled className='text-[#4285F4] w-5 h-5' />
              Google
            </Button>
            <Button
              type='default'
              className='flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'>
              <LinkedinFilled className='text-[#0A66C2] w-5 h-5' />
              LinkedIn
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default JobSeekerRegister;
