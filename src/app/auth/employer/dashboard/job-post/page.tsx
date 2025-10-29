"use client"

import React, { useEffect } from "react";


import type { FormInstance } from 'antd';
import { Button, Form, Input, message, Space } from 'antd';
import axios from "axios";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};


const JobPost = () => {
  const [form] = Form.useForm();
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//  useEffect(()=>{

//   if(typeof window === "undefined") return;

//     const userData = localStorage.getItem("user");
//     console.log("User data from localStorage:", userData);

//     if(!userData){
//       message.error("Please login first!");
//       window.location.href = "/auth"
//       return;
//     }

//     try{
// const user = JSON.parse(userData);
//     console.log("Parsed user", user)

//     if(!user.role){
//       message.error("Invalid user data.Please login again");
//       localStorage.removeItem("user");
//       window.localStorage.href = "/auth"
//     }

//     if(user.role !== "employer" && user.role !== "admin"){
//       message.error("Access deniew! only employers of admins can post jobs");
//       window.location.href = "/";
//     }
//     }catch(error){
//        console.error("Invalid user data in localStorage", error);
//       localStorage.removeItem("user");
//       window.location.href = "/auth";
//     }
    
//    },[])

  const onFinish = async (values: any) =>{
    try{
       const token = localStorage.getItem("token");
       console.log(token);

      if (!token) {
        message.error("You must be logged in as employer/admin to post jobs.");
        return;
      }

      
      const res = await axios.post(`${API_BASE_URL}/api/job`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(res.data.success){
        message.success("Job posted successfully");
        form.resetFields();
      } else{
        message.error(res.data.message || "Something went wrong!")
      }
    }catch(error: any){
     console.error(error)

     if(error.response?.status === 403){
      message.error("Access denied! Only admin or employer can post jobs.")
     } else{
      message.error(
        error.response?.data?.message || "Server error. Try again later!"
      )
     }
    }
  }
  return (
    <div className='flex flex-col justify-center items-center px-4 md:px-12'>
      <h1>Reach the largest remote community on the web</h1>

      <div className='w-full max-w-4xl bg-white shadow-md rounded-2xl p-6 md:p-10'>
        <Form
          form={form}
          name='validateOnly'
          layout='vertical'
          autoComplete='off'
          onFinish={onFinish}>
          <Form.Item
            name='title'
            label='Job Title'
            rules={[{ required: true }]}>
            <Input className='!w-full md:w-72' />
          </Form.Item>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2'>
            <Form.Item
              name='position'
              label='Category'
              rules={[{ required: true }]}>
              <Input className='!w-full' />
            </Form.Item>
            <Form.Item
              name='company'
              label='Company Name'
              rules={[{ required: true }]}>
              <Input className='!w-full' />
            </Form.Item>
          </div>
          <h3>Is This Role Open Worldwide? </h3>
          <Form.Item name='jobType' label='Job Type' rules={[{ required: true }]}>
            <Input className='!w-full' />
          </Form.Item>
          <Form.Item name='city' label='city'>
            <Input className='!w-full' />
          </Form.Item>
          <Form.Item
            name='location'
            label='Location'
            rules={[{ required: true }]}>
            <Input className='!w-full' />
          </Form.Item>
          <Form.Item name='salary' label='Salary' rules={[{ required: true }]}>
            <Input className='!w-full' />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[{ required: true }]}>
            <Input.TextArea rows={12} />
          </Form.Item>
          <Form.Item>
            <Space className='flex gap-4 justify-center items-center'>
              <Button htmlType='submit' className='w-full'>
                Submit
              </Button>
              <Button className='w-full' htmlType='reset'>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default JobPost;
