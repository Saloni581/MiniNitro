import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/visuals",
    withCredentials: true
});

export const uploadAvatar = async (formData: FormData) => {
    const result = await api.post(
        "/upload-avatar",
         formData,
    );
    return result.data;
}