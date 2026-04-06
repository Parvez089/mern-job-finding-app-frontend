"use client"

import React from "react";

import { Button } from "antd";
import Link from "next/link";





const AuthRoute = () => {
  return (
    <div className='flex flex-col justify-center !my-35 items-center '>
      <div className='bg-white w-full max-w-lg px-12 py-14 rounded-lg shadow'>
        <h1 className='text-3xl !font-bold text-black text-center'>Sign up</h1>
        <p className='text-center'>
          Join thousands of satisfied job seekers and <br />
          <span>companies who are already on JobOrbit.</span>
        </p>

        <div className='flex flex-col gap-8 mt-8'>
          <Link
            href={"auth/job-seeker/register"}
            className='border px-8 py-2 text-center flex-col justify-center items-center rounded-lg'>
            <h4 className='!mt-2 !font-bold'>Find Jobs & Sign Up</h4>
            <p>Create your profile to start applying.</p>
          </Link>
          <Link
            href={"auth/employer/register"}
            className='border px-8 py-2 text-center flex-col justify-center items-center rounded-lg !hover:border-[var(--bg-color)] '>
            <h4 className='!mt-2 !font-bold'>Hire Talent & Sign Up</h4>
            <p>Post a job and find top talent.</p>
          </Link>
        </div>
        <Button
          className='!mt-8 !w-full !bg-[var(--bg-color)] !text-white 
             focus:outline-none focus:ring-2 focus:ring-red-500 
             hover:!text-white !py-5 !text-xl !font-semibold'
          onClick={() => alert("Please select an option first.")}>
          Continue
        </Button>
        <p className='!mt-2'>
          Already have an account?{" "}
          <Link
            href={"/auth/job-seeker/login"}
            className='text-blue-500 !font-semibold'>
            Log in.
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthRoute;
