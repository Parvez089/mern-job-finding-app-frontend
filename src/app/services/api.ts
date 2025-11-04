'use client';


import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/job`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const getJobById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/job/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    return null;
  }
};
