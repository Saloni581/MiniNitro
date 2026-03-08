import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/messages",
    withCredentials: true
});

export const fetchMessages = async ({ userId }: {
    userId : string;
}) => {
    const res = await api.get(`/${userId}`);
    return res.data;
}