import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/conversation',
    withCredentials: true,
});

export const fetchConversationsOfLoggedInUser = async () => {
    const res = await api.get(`/all-conversations`);
    return res.data;
}