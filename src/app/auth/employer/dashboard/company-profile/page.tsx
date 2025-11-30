"use client"

import ProfileImage from "@/Component/profile/ProfileImage";
import { CalculatorOutlined } from "@ant-design/icons";
import { Progress, Switch } from "antd";
import Image from "next/image";
import React from "react";

const CompanyProfile = () => {
  return <div className="lg:mx-16">
    <div className="flex justify-between">
      <div> Name</div>
      <div>
        <h1>Added on: 02-05-2025</h1>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mt-4">
      <div>
        <div>
          <h1>PROFILE IMAGE</h1>
          <div className="flex flex-col gap-4 mt-4">
 <ProfileImage/>

          <h2 >Change Profile Image</h2>
          </div>
          <div className="mt-4 clear-both flex flex-col gap-4">
<p className="font-bold text-gray-500">EMPLOYEE DETAILS</p>
<div className="bg-gray-100 p-1 rounded-lg ">
  <h1 className="text-gray-400"> First Name</h1>
  <p className="font-semibold">Nazmul</p>
</div>
<div className="bg-gray-100 p-1 rounded-lg ">
  <h1 className="text-gray-400">Last Name</h1>
  <p className="font-semibold">Hasan</p>
</div>
<div className="bg-gray-100 p-1 rounded-lg ">
  <h1 className="text-gray-400">Email <address></address></h1>
  <p className="font-semibold">abc@test.gmail.com</p>
</div>
<div className="bg-gray-100 p-1 rounded-lg ">
  <h1 className="text-gray-400">Phone</h1>
  <p className="font-semibold">+00833333</p>
</div>
<div className="bg-gray-100 p-1 rounded-lg ">
  <h1 className="text-gray-400">Position</h1>
  <p className="font-semibold">Flutter Developer</p>
</div>
          </div>
          
        </div>
      </div>

      {/* Role  */}
      <div>
 <h1>Role</h1>
        <div className="bg-gray-100 px-2 py-2 mt-4 rounded-lg">
         <h1>Role</h1>
         <h1 className="">Employer</h1>
        </div>
        <div className="mt-12 flex flex-col gap-4">
          <h1>Teams</h1>
          <div className="flex flex-row gap-4 px-2 py-1 bg-gray-100 rounded-lg items-center ">
            <div >
              <h1 className="">HR</h1>
            <Image width={40}
  height={30}
  alt="Team" src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"className="rounded-full"/>
            </div>

  <h1>Arif Hasan</h1>
          </div>
          <div className="flex flex-row gap-4 px-2 py-1 bg-gray-100 rounded-lg items-center ">
            <div >
              <h1 className="">HR</h1>
            <Image width={40}
  height={30}
  alt="Team" src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"className="rounded-full"/>
            </div>

  <h1>Arif Hasan</h1>
          </div>
          <div className="flex flex-row gap-4 px-2 py-1 bg-gray-100 rounded-lg items-center ">
            <div >
              <h1 className="">HR</h1>
            <Image width={40}
  height={30}
  alt="Team" src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"className="rounded-full"/>
            </div>

  <h1>Arif Hasan</h1>
          </div>
        </div>
      </div>

      {/* // Onboard  */}
      <div>
        <h1 className="font-bold">ONBOARDING</h1>
        
        <div className="bg-gray-100 px-2 py-2 mt-4 flex justify-between rounded-lg">
          <div>
          <h1>Starts On</h1>
          <h1>21.05.2025</h1>
          </div>
          
          <CalculatorOutlined/>
        </div>
        <div className="mt-8">
          <div className="flex gap-4 text">
<Switch size="small" defaultChecked />
          <h1>Onboarding required</h1>

          </div>

          <div className="flex flex-col gap-4 mt-8">
            <h1>Current Status</h1>
            <div className=" gap-8 px-2 py-2 mt-4 flex justify-between rounded-lg">
              <h1 className="bg-green-100 p-1 px-2 rounded-lg">Onboarding</h1>
               <Progress className="bg-white shadow py-2" size="small" percent={35} />

            </div>
          </div>
          
        </div>
        <div></div>
      </div>
    </div>
  </div>;
};

export default CompanyProfile;
