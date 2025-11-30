"use client";

import Charts from "@/app/components/Charts";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const EmployerDashboard = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null)
  const [totalViews, setTotalViews] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_BASE_URL}/api/applications/employer/applicants`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalApplicants(res.data.totalApplicants);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          
          `${API_BASE_URL}/api/applications/employer/total-jobs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTotalJobs(res.data.totalJobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
  const fetchJobViews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/applications/employer/total-job-views`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalViews(res.data.totalViews);
    } catch (err) {
      console.error(err);
    }
  };

  fetchJobViews();
}, []);
  return (
    <div>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-8'>
        <div className='flex justify-between bg-white shadow-sm rounded-lg p-2'>
          <div>
            <h1 className='text-xl text-blue-500 !font-bold'>
              {totalViews!== null ? totalViews : "Loading..."}
            </h1>
            <h3>Total Views</h3>
          </div>

          <UserOutlined className='text-xl' />
        </div>
        <div className='flex justify-between bg-white shadow-sm p-2 rounded-lg  '>
          <div>
            <h1 className='text-xl'> {totalJobs!== null ? totalJobs : "Loading..."}</h1>
            <h3>Posted Job</h3>
          </div>

          <UserOutlined className='text-xl' />
        </div>
        <div className='flex justify-between bg-white shadow-sm rounded-lg p-2'>
          <div>
            <h1 className='text-xl'>
              {totalApplicants !== null ? totalApplicants : "Loading..."}
            </h1>
            <h3>Total Application</h3>
          </div>

          <UserOutlined className='text-xl' />
        </div>
        <div className='flex justify-between bg-white shadow-sm p-2 rounded-lg'>
          <div>
            <h1 className='text-xl'>08</h1>
            <h3>Shortlist</h3>
          </div>

          <UserOutlined className='text-xl' />
        </div>
    
      </div>
      <div className='grid md:grid-cols-3   gap-4 mt-4'>
        <div className=' bg-white rounded-lg shadow-lg md:py-34 '>
          <Charts />
        </div>
        <div className='bg-yellow-200  md:py-34'>
          <h2>Posted Job</h2>
        </div>
        <div className='bg-yellow-200  md:py-34'>
          <h2>Posted Job</h2>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
