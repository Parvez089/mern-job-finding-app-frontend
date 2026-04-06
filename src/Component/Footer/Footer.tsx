import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-primary)] text-white mt-16">
   <div className="max-w-7xl mx-auto px-6 py-28">
     {/* Main Footer content */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {/* Brand Section */}
    <div >
      <h1 className="text-2xl font-bold!">JobOrbit</h1>
      <p className="mt-4 text-gray-300 leading-relaxed"> Discover the best remote companies in the world. View a company’s
              profile to learn about its mission, culture, values, tech stack,
              employee benefits and open remote roles.</p>
    </div>

    {/* Job Seekers */}
    <div>
      <h2 className="text-xl font-semibold! mb-4">For Job Seekers</h2>
      <ul className="space-y-2 text-gray-300">
        <li>Browse Jobs</li>
        <li>Salary Tools</li>
        <li>Career Advice</li>
        <li>Student Carrer Center</li>
      </ul>
    </div>

    {/* Employers */}
    <div>
      <h2 className="text-xl font-semibold! mb-4">For Employers</h2>
      <ul className="space-y-2 text-gray-300">
        <li>Products</li>
        <li>Solutions</li>
         <li>Pricing</li>
        <li>Resources</li>
        <li>Help</li>
      </ul>
    </div>
     </div>

     {/* Bottom Bar */}
     <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
         © {new Date().getFullYear()} JobOrbit. All rights reserved.
      </p>

      <div className="flex gap-4 md:mt-0 text-xl">
        <FacebookFilled/>
        <InstagramFilled/>
        <LinkedinFilled/>
      </div>
     </div>
   </div>
    </footer>
  );
};

export default Footer;
