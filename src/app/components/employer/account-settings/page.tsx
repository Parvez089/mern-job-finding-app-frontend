"use client";

import React from "react";

import { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import Image from "next/image";
import { Button, Divider, Form, Input } from "antd";
import { GoogleCircleFilled, GooglePlusCircleFilled } from "@ant-design/icons";
const AccountSettingComponents = () => {
     const [activeTab, setActiveTab] = useState("profile");
  return  (
    <div className="flex flex-col max-w-3xl w-full">
      <h1 className="!font-semibold">Account</h1>
      <p>Real-time information and activities of your property.</p>
<Divider className="!mb-2 "/>
      <div  className="mt-2 flex md:flex-col justify-between">
        <div className="md:flex md:gap-4 gap-12 items-center justify-between">
    <div className="flex gap-4 ">

      <div>
 <Image width={60} height={60} alt ="" src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded-full w-15 h-15"/>
      </div>

   <div className="flex  flex-col mt-3 !space-y-0">
    <p className="font-semibold">Profile picture</p>
    <p>PNG,JPEG,JPG under 10MB</p>
   </div>

    </div>
  
   <div className="flex gap-4 mt-2">
    <button className="bg-white px-2 py-1 rounded-lg">Upload new picture</button>
    <button>Delete</button>
   </div>
        </div>
     
      </div>
      <div className="mt-4 ">
        <Form name="layout-multiple-horizontal" layout="horizontal">
          <div className="flex !w-full gap-4">
             <Form.Item layout="vertical" label="First Name" name="vertical" className="w-full">
        <Input />
      </Form.Item>
             <Form.Item layout="vertical" label="Last Name" name="vertical" className="w-full">
        <Input />
      </Form.Item>
          </div>

        </Form>
        <div>
          <Divider className=" !mt-0"/>

          {/* Contact information */}
          <div className="">
            <h1 className="!font-semibold">Contact </h1>
            <p>Manage Your Contact Information</p>
            <Form name="layout-multiple-horizontal" layout="horizontal">
          <div className="flex !w-full gap-4">
             <Form.Item layout="vertical" label="Email" name="vertical" className="w-full">
        <Input />
      </Form.Item>
             <Form.Item layout="vertical" label="Phone" name="vertical" className="w-full">
        <Input />
      </Form.Item>
          </div>

        </Form>
          </div>
           <Divider className="!mt-0"/>

           {/* Password */}

             <div>
            <h1 className="!font-semibold">Password </h1>
            <p>Modify your current password</p>
            <Form name="layout-multiple-horizontal" layout="horizontal">
          <div className="flex !w-full gap-4">
             <Form.Item layout="vertical" label="Current Password" name="vertical" className="w-full">
        <Input />
      </Form.Item>
             <Form.Item layout="vertical" label="New Password" name="vertical" className="w-full">
        <Input />
      </Form.Item>
          </div>

        </Form>
          </div>
           <Divider className="!mt-0"/>

           <div>
             <h1>Integrated Account</h1>
             <p>Manage your current integrated accounts.</p>
               
             <div className="bg-white w-full flex justify-between  rounded shadow">
               
                <div className="flex gap-4 px-2 py-1">
                   <GoogleCircleFilled className="text-2xl"/>
                   <div className="!space-y-1 mt-2">
                  <p className=" font-semibold">Google</p>
                  <p className="text-sm text-gray-500">Use Google for the faster login methods in your account</p>
                   </div>
                 
                </div>

                <div className="flex justify-center items-center mr-2">
                  <Button>Connect</Button>
                </div>
             </div>
             <div>
               
             </div>
           </div>

           {/* Button */}

           <div className="mt-8">
         <Button className="w-full mt-4">Save</Button>

           </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingComponents;
