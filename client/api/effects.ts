import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/effects" ||"http://localhost:3000/api/effects",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const updateAvatarEffect = async (effectId: string) => {
    const res = await api.patch("/avatar-effects/active", {
        effectId
    });
    return res.data;
}

export const removeAvatarEffect = async () => {
    const res = await api.patch("/avatar-effects/active", {});
    return res.data;
}