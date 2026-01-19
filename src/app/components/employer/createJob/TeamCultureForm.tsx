/** @format */

import {
  BookOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Tag } from "antd";
import React, { useState } from "react";

interface TeamCultureProps {
  onNext: () => void;
  onBack: () => void;
}
const TeamCultureForm = ({ onNext, onBack }: TeamCultureProps) => {
  const [selectedPerks, setSelectedPerks] = useState([
    "Health Insurance",
    "Unlimited PTO",
    "Gym Membership",
    "401k Matching",
  ]);

  const allPerks = [
    "Health Insurance",
    "Unlimited PTO",
    "Gym Membership",
    "401k Matching",
    "Paid Parental Leave",
    "Equity Options",
  ];

  const workCultures = [
    {
      title: "Remote Friendly",
      desc: "Work for any Where in the world.",
      icon: <GlobalOutlined className='text-xl' />,
    },
    {
      title: "Flexible Hours",
      desc: "Manage your own schedule.",
      icon: <ClockCircleOutlined className='text-xl text-blue-600' />,
    },
    {
      title: "Collaborative Environment",
      desc: "Thrive in a team=first culture.",
      icon: <TeamOutlined className='text-xl text-purple-600' />,
    },
    {
      title: "Learning Stipends",
      desc: "Budget for books and courses",
      icon: <BookOutlined className='text-xl text-orange-500' />,
    },
  ];

  const togglePerk = (perk: string) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk],
    );
  };

  return (
    <div className='bg-white rounded-3xl! border border-gray-100! p-6 md:p-8 shadow-sm'>
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold! text-[#0e0f1b]'>Team & Culture</h2>
        <p>
          Showcase your company personality and the benefits of joining your
          team.
        </p>
      </div>

      <div className='space-y-8'>
        <div>
          <label className='font-bold! text-[#0e0f1b] text-sm block mb-4'>
            Work Culture
          </label>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {workCultures.map((item) => (
              <div
                key={item.title}
                className='flex items-start gap-4 p-4 rounded-2xl! bg-gray-50! border border-gray-100! hover:border-indigo-200 transition-all cursor-pointer'>
                <div className='p-2 bg-white rounded-xl! shadow-sm'>
                  {item.icon}
                </div>
                <div className='flex-1'>
                  <h4 className='font-bold! text-sm text[#0e0f1b]'>
                    {" "}
                    {item.title}
                  </h4>
                  <p className='text-xs text-gray-500'>{item.desc}</p>
                </div>
                <Checkbox />
              </div>
            ))}
          </div>
        </div>
        {/* Perks & Benefits Section */}
        <div>
          {/* className='font-bold! text-[#0e0f1b] text-sm block mb-4' */}
          <label className='font-bold! text-[#0e0f1b]text-sm block mb-4!'>
            Perks & Benefits
          </label>
          <div className='flex flex-wrap gap-3'>
            {allPerks.map((perk) => (
              <Tag
                key={perk}
                onClick={() => togglePerk(perk)}
                className={`px-5! py-3! rounded-full! cursor-pointer transition-all border-none font-medium text-sm! ${
                  selectedPerks.includes(perk)
                    ? "bg-[#4950e5]! text-white!"
                    : "bg-white! border-gray-200! text-gray-500 hover:bg-gray-50!"
                }`}>
                {perk}
              </Tag>
            ))}
            <button className='text-[#4950e5] font-bold! text-sm flex items-center gap-1 hover:underline ml-2!'>
              <PlusOutlined size={12} /> Add custom perk
            </button>
          </div>
        </div>
        {/* Team Introduction Section */}
        {/* className='flex flex-col gap-2 */}
        <div className=' flex flex-col gap-2'>
          {/* className='font-bold! text-[#0e0f1b] text-sm' */}
          <label className='font-bold! text-[#0e0f1b] text-sm'>
            Team Introduction
          </label>

          {/* className='w-full p-4 rounded-2xl bg-gray-50 border border-transparent
          focus:border-indigo-200 focus:bg-white transition-all text-sm
          text-gray-700 outline-none resize-none' */}
          <textarea
            rows={5}
            placeholder='Introduce the team and the working environment....'
            defaultValue='You will be joining our Product Experience squad, a cross-functional team of 4 designers, 8 engineers, and 2 product managers. We focus on building the most intuitive hiring tools on the market.'
            className='w-full p-4 rounded-2xl! bg-gray-50 border! border-transparent! focus:border-indigo-200! focus:bg-white! transition-all text-sm text-gray-700 outline-none resize-none'
          />
        </div>

        {/* Footer Buttons */}
        <div className='flex items-center justify-between pt-6 border-t border-gray-50 mt-8'>
          <Button
            onClick={onBack}
            className='h-12 px-6 rounded-xl! font-bold! text-gray-500 bg-gray-50! border-none flex items-center'>
            Back
          </Button>
          <Button
            type='primary'
            onClick={onNext}
            className='h-12 px-8 rounded-xl! font-bold! bg-[#4950e5] flex items-center gap-2'>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCultureForm;
