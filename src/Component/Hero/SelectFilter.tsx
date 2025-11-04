
"use client"
import React from "react";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {Button, Dropdown, message, Space, Tooltip } from "antd";

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};
const SelectFilter = () => {
  return (
    <div className=" w-full  flex justify-center">
      <div className="flex  flex-wrap justify-center items-center bg-white border-t border-gray-200 p-3 flex flex-wrap gap-2 md:gap-3 sm:gap-3 w-full max-w-7xl rounded-b-lg shadow-sm ">
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Expreience
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Company
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Job types
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Salary
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Market
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Benifit
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      </div>
    </div>
  );
};

export default SelectFilter;
