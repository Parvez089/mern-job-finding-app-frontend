"use client"

import React, { useState } from "react";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import Link from "next/link";


const ManageListing = () => {

  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);


  // const handleChange1 =(e: any) => setChecked1(e.target.checked)
  // const handleChange2 =(e: any) => setChecked2(e.target.checked)
  // const handleChange3 =(e: any) => setChecked3(e.target.checked)

  const [selected, setSelected] = useState<"all" | "active" | "inactive" | null>(null);

  const handleChange = (type: "all" | "active" | "inactive") =>{

    if(selected === null){
      setSelected(type)
    }

    if(selected === type) return;
    
    setSelected(type)
  };

  return <div className="flex gap-4 flex-col justify-center items-center ">

    <div className="flex flex-col gap-4">
    <h1 className="text-4xl text-center">Manage Listing</h1>
    <div className="flex ml-5">
      <Checkbox checked={selected== "all"} onChange={()=> handleChange("all")}>All</Checkbox>
      <Checkbox checked={selected== "active"} onChange={()=> handleChange("active")}>Active</Checkbox>
      <Checkbox checked={selected== "inactive"} onChange={()=> handleChange("inactive")}>Inactive</Checkbox>

    </div>
    
   {selected == "all" && (
   <h2 className="!font-semibold text-2xl ml-5">Welcome to WWR! Save $50 on your first job by entering WELCOME50 at checkout. <Link className="underline" href="/auth/employer/dashboard/job-post">Post your first job now!
 </Link>`</h2>)}    
    
    {selected == "active" && (
   <h2 className="!font-semibold text-2xl ml-5">You have no active jobs. <Link className="underline" href="/auth/employer/dashboard/job-post">Post your first job now!
 </Link>`</h2>)}  

    {selected == "inactive" && (
   <h2 className="!font-semibold text-2xl ml-5">You have no inactive jobs. <Link className="underline" href="/auth/employer/dashboard/job-post">Post your first job now!
 </Link>`</h2>)}   

 
     
   


    </div>

  </div>;
};

export default ManageListing;
