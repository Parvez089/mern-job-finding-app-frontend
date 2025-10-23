import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const HeroText = () => {
  return <div className="drop-shadow-lg ">  
    <div className="">
        <div className="flex flex-col text-center p-2 mt-8">
        <h1 className="text-4xl md:text-5xl !font-bold !m-2 text-[var(--primary-text)] !text-shadow">JobOrbit</h1>
          <h3 className="text-xl">Your next job starts here</h3>
          <p className="text">Create an account or sign in to see your personalized job recommendations.</p>
        </div>
        <div className="flex justify-center ">
          <Link href={"/auth"}>
 <Button className=" !items-center !text-xl py-4 w-48 !h-12 !bg-[var(--bg-color)] !text-white !font-semibold">Get Started <ArrowRightOutlined className="!font-semibold "/> </Button>
          </Link>
       
        </div>
        <div className="mt-20">
          <h1 className="text-center">Post your resume - It only takes a few seconds</h1>
        </div>
       
      </div>
       </div>;
};

export default HeroText;
