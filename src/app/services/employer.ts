import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEmployerProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/api/employer/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
}

export const updateEmployerProfile = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const res = await axios.patch(`${API_BASE_URL}/api/employer/update`, formData, {
    headers: {
      // REMOVE "Content-Type" here. Let the browser set it.
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
