import { CopyOutlined, CopyrightCircleFilled, CopyrightCircleOutlined, FacebookFilled, InstagramFilled, LinkedinFilled } from "@ant-design/icons";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#f1f1f1] py-8  bottom-0 w-full">
      <div className="flex md:flex-row gap-4 justify-between md:mx-24">
    <div >
      <h1 className="text-2xl !font-bold text-[var(--primary-text)]">Job Orbit</h1>
    </div>
    <ul className="list-none flex flex-wrap justify-center text-sm gap-4 ">
      <li>Top 100 Companies</li>
      <li>Blog</li>
      <li>FAQ-Employer</li>
      <li>Event</li>
    </ul>
    <div className="text-red-400 text-center px-4 py-1 bg-red-100">
      32,022 Remote jobs Posted
    </div>
  </div>

  
    </div>
    <div className="bg-[var(--bg-primary)]">
    <div className="flex justify-between mx-24 py-8 text-white">
      <div>
        <h1><CopyrightCircleOutlined className="font-bold"/> 2025 Job Orbit </h1>
      </div>
 <ul  className="list-none flex flex-wrap justify-center text-sm gap-4 ">
      <li>Contact Support</li>
      <li>Terms</li>
      <li>Guidelines</li>
      <li>Privacy</li>
    </ul>

    <div className="flex gap-2 text-white">
      <FacebookFilled/>
      <LinkedinFilled/>
      <InstagramFilled/>
    </div>
    </div>
   
    
  </div>
    </div>
    
    ) ;
};

export default Footer;
