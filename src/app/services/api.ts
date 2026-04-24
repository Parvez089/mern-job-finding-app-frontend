
import axios  from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllJobs = async(page: number = 1, limit: number = 12, filters: any = {})=>{
  try{
    // const res = await axios.get( `${API_BASE_URL}/api/job?page=${page}&limit=${limit}`);
    const res = await axios.get(`${API_BASE_URL}/api/job`, {
      params: {
        page,
        limit,
        ...filters 
      }
      });
    return res.data;
  } catch(err){
    console.error("Error fetching jobs: ", err)
  }
}

export const getJobById = async (id: string) => {
  try{
    const res =await axios.get(`${API_BASE_URL}/api/job/${id}`);
    return res.data;
  } catch(err){
    console.error("Error fetching job by Id", err);
    
  }
}