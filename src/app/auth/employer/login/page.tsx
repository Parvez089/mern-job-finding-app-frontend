/** @format */
"use client"
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

type FieldType = {
  password?: string;
  email?: string;
  remember?: string;
};



const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const EmployerLogin = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const onFinish = async (values: FieldType) => {
  
    try {   
      
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        ...values,
        role: "employer",
      });

      const token = res.data.token;
      console.log("Login Token: ", token);
      const user = res.data.user;

      if(token && user){
        localStorage.setItem("token", token)
         localStorage.setItem("user", JSON.stringify(user));
        message.success(res.data.message);

        setTimeout(()=>{
 window.location.href = "/";
        }, 500)
     
      } else{
         message.error("Invalid login response from server!");
      }



    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed!");
    }
  };
  return (
    <div className='flex justify-center items-center !my-35 px-4'>
      <div className='bg-white w-full max-w-lg px-6 sm:px-8 py-10 sm:py-12 rounded-xl shadow-lg'>
        <h1 className='text-3xl font-bold text-center'>Sign in</h1>
        <p className='text-center text-gray-600 mb-6'>
          Sign in to your Employer Account on JobOrbit.
        </p>

        <Form
          name='basic'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item<FieldType>
            label='Email'
            name='email'
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input placeholder='Your Email' />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password placeholder='Your Password' />
          </Form.Item>
          <div className='!flex !flex-col justify-between'>
            <Checkbox>Keep me signed in</Checkbox>
            <p className='text-red-600 hover:underline cursor-pointer'>
              Forgot your password?
            </p>
          </div>

          <Form.Item label={null}>
            <Button
              className='w-full !bg-[var(--bg-color)] !text-white py-3 text-lg !font-semibold !mt-8'
              htmlType='submit'>
              Continue
            </Button>
          </Form.Item>
        </Form>

        <p className='text-center text-gray-600 mb-6'>
          Don't have an account? Create one here
        </p>
      </div>
    </div>
  );
};

export default EmployerLogin;
