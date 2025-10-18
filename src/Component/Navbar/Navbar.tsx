/** @format */
"use client"
import React, { useState, useEffect } from "react";
import { Menu, Drawer, Button, Input, GetProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const onSearch: SearchProps["onSearch"] = (value, event, info) => {
  console.log("Search source:", info?.source);
  console.log("Search value:", value);
};

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // detect client-side mount
  const route = useRouter();

  useEffect(() => {
    setMounted(true); // now we are on client-side

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setVisible(false); // close Drawer if screen becomes large
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { key: "home", label: <Link href='/'>Home</Link> },
    { key: "about", label: <Link href='/about'>About</Link> },
    { key: "services", label: <Link href='/services'>Services</Link> },
    { key: "talent", label: <Link href='/talent'>Find Talent</Link> },
    { key: "contact", label: <Link href='/contact'>Contact</Link> },
  ];

  // Prevent flicker on first render
  if (!mounted) return null;

  return (
    <header className='bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 md:w-full'>
      <div className='text-2xl sm:text-2xl font-semibold text-[var(--primary-text)] tracking-tight'>
        JobOrbit
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <div className='flex items-center gap-2 sm:gap-5'>
          <Menu
            theme='light'
            mode='horizontal'
            items={menuItems}
            className='bg-white !border-none text-sm sm:text-base'
          />
          <Search
            placeholder='Search jobs...'
            onSearch={onSearch}
            style={{ width: 200 }}
            className='!outline-none rounded-lg !border !border-[var(--bg-color)]'
          />
          <Link href={"/auth"}>
            <Button
              className='!border-dashed !border-[var(--bg-color)] text-[var(--primary-text)] !hover:text-[var(--primary-text)] text-sm sm:text-base'
              variant='dashed'
              >
              Get Started
            </Button>
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          type='text'
          icon={<MenuOutlined className='text-black text-2xl' />}
          onClick={() => setVisible(true)}
        />
      )}

      {/* Mobile Drawer */}
      <Drawer
        placement='right'
        onClose={() => setVisible(false)}
        open={visible}
        closable={false}>
        <Menu mode='vertical' items={menuItems} className='border-none' />
      </Drawer>
    </header>
  );
};

export default Navbar;
