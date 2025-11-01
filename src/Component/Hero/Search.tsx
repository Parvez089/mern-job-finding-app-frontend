/** @format */

"use client";

import React from "react";
import { Button, Input } from "antd";
import type { GetProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
const SearchPage = () => {
  return  <div>
      <div className='md:flex flex-row !items-center  hidden !justify-center !content-center '>
        <div className='flex   p-2 !rounded-l-lg  bg-white'>
          <SearchOutlined className='!outline-none !shadow-none text-2xl ' />
          <Input className='!border-none !outline-none !shadow-none md:!w-72' placeholder="Job title, keywords, or company"/>
        </div>
        <div className='flex p-2   bg-white  rounded-r-lg'>
          <FontAwesomeIcon width={2} height={2} icon={faLocationDot} className='text-2xl' />
          <Input variant={"borderless"} 
            className='!border-none !outline-none !shadow-none !w-72'
            placeholder="City, state, zip code, or 'remote'"
          />
          <Button className='!bg-[var(--bg-color)] !text-white !font-semibold !h-7 '>
            Search
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 items-center md:hidden justify-center mt-24 w-full'>
        <div className='flex mx-5 p-2 border-2 bg-white max-w-full rounded-t-lg'>
          <SearchOutlined className='!border-none !outline-none !shadow-none text-2xl' />
          <Input className='!border-none !outline-none !shadow-none  w-full' />
        </div>
        <div className='flex mx-5  p-2 !border-x-2 !border-b-2 bg-white rounded-b-lg '>
          <FontAwesomeIcon icon={faLocationDot} className='text-2xl' />
          <Input
            className='!border-none !outline-none !shadow-none !w-96'
            placeholder="City, state, zip code, or 'remote'"
          />
        
        </div>
         <div className=" mt-2 mx-5">
            <Button className='!bg-[var(--bg-color)]  !text-white !font-semibold !h-12 w-full !text-xl'>
            Search
          </Button>
        </div>
      </div>
     
    </div>;
};

export default SearchPage;
