import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/messages" || "http://localhost:3000/api/messages",
    withCredentials: true
});

export const fetchMessages = async ({ userId }: {
    userId : string;
}) => {
    const res = await api.get(`/${userId}`);
    return res.data;
}