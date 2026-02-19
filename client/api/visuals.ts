import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/visuals",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true
});

export const uploadAvatar = async (formData: FormData) => {
    const result = await api.post(
        "/avatar",
        {
            formData,
        },
    );
    return result.data;
}