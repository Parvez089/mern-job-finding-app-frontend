import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEmployerProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/api/employer/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
}