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
  return (
    <div className="w-full flex justify-center mt-7">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center w-full max-w-7xl">
        {/* Job title input */}
        <div className="flex flex-1 p-3 bg-white rounded-tl-lg">
          <SearchOutlined className="text-2xl text-gray-600" />
          <Input
            className="!border-none !outline-none !shadow-none w-full"
            placeholder="Job title, keywords, or company"
          />
        </div>

        {/* Location input + Search button */}
        <div className="flex flex-1 p-3 bg-white rounded-tr-lg">
          <FontAwesomeIcon
            icon={faLocationDot} width={20} height={20}
            className="text-2xl text-gray-600"
          />
          <Input
            variant="borderless"
            className="!border-none !outline-none !shadow-none w-full"
            placeholder="City, state, zip code, or 'remote'"
          />
          <Button className="!bg-[var(--bg-color)] !text-white !font-semibold !h-7 !px-6 ml-2">
            Search
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 items-center md:hidden justify-center mt-6 w-full px-5">
        <div className="flex p-2 bg-white rounded-t-lg">
          <SearchOutlined className="text-2xl text-gray-600" />
          <Input
            className="!border-none !outline-none !shadow-none w-full"
            placeholder="Job title, keywords, or company"
          />
        </div>

        <div className="flex p-2 bg-white rounded-b-lg mt-[1px]">
          <FontAwesomeIcon icon={faLocationDot} className="text-2xl text-gray-600" />
          <Input
            className="!border-none !outline-none !shadow-none w-full"
            placeholder="City, state, zip code, or 'remote'"
          />
        </div>

        <div className="mt-3">
          <Button className="!bg-[var(--bg-color)] !text-white !font-semibold !h-12 w-full !text-lg">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
