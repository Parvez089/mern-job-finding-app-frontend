/** @format */
"use client"
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import Icon, { LinkedinFilled, GoogleCircleFilled } from "@ant-design/icons";
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

const EmployerRegister = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const onFinish = async (values: FieldType) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        ...values,
        role: "employer",
      });
      message.success(res.data.message);
      window.location.href = "/";
    } catch (error: any) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };
  return (
    <div className='flex flex-col justify-center items-center  px-4 sm:px-6 lg:px-8 '>
      <div className='bg-white px-6 py-14 sm:px-12 sm:py-14 rounded-lg shadow w-full max-w-md'>
        <h1 className='text-2xl sm:text-3xl text-center !font-bold'>
          Create an <br /> Employer Account
        </h1>
        <p className='text-center text-sm sm:text-base mt-2'>
          Sign up to create your Employer Account on JobOrbit.
        </p>

        <div className='flex items-center  justify-center'>
          <Form
            name='basic'
            className='hover:outline-none w-96 !mt-4'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item<FieldType>
              layout='vertical'
              label='Company name'
              name='name'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              layout='vertical'
              label='Email'
              name='email'
              rules={[{ required: true, message: "Please input your email!" }]}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              layout='vertical'
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password autoComplete='current-password' />
            </Form.Item>

            <Form.Item<FieldType>
              name='remember'
              valuePropName='checked'
              label={null}>
              <Checkbox className='text-xs sm:text-sm'>
                By signing up, I agree to JobOrbit`s Terms of Service and
                Privacy Policy.
              </Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button
                className='!w-full !bg-[var(--bg-color)] !text-white !mt-4 !font-semibold'
                htmlType='submit'>
                Continue
              </Button>
              <p className='!mt-4'>
                Already have an account?{" "}
                <span>Sign in to your employer account</span>{" "}
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
