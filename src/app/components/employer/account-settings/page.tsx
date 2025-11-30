"use client";

import React from "react";

import { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import Image from "next/image";
import { Divider, Form, Input } from "antd";
const AccountSettingComponents = () => {
     const [activeTab, setActiveTab] = useState("profile");
  return  (
    <div className="flex flex-col max-w-3xl w-full">
      <h1>Account</h1>
      <p>Real-time information and activities of your property.</p>
<Divider/>
      <div  className="mt-4 flex flex-col justify-between">
        <div className="flex gap-4 items-center justify-between">
    <div className="flex gap-4 ">

      <div>
 <Image width={60} height={60} alt ="" src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded-full w-15 h-15"/>
      </div>

   <div className="flex  flex-col -gap-2">
    <p className="">Profile picture</p>
    <p>PNG,JPEG,JPG under 10MB</p>
   </div>

    </div>
  
   <div className="flex gap-4">
    <button className="bg-white px-2 py-1 rounded-lg">Upload new picture</button>
    <button>Delete</button>
   </div>
        </div>
     
      </div>
      <div className="mt-4">
        <Form name="layout-multiple-horizontal" layout="horizontal">
          <div className="flex !w-full gap-4">
             <Form.Item layout="vertical" label="First name Name" name="vertical" className="w-full">
        <Input />
      </Form.Item>
             <Form.Item layout="vertical" label="Last Name" name="vertical" className="w-full">
        <Input />
      </Form.Item>
          </div>

        </Form>
        <div>
          <Divider/>

          {/* Contact information */}
          <div>
            <h1>Contact email</h1>
            <p>Manage Your account email address for the invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingComponents;
