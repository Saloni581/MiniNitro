import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/effects",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const patchAvatarEffect = async (effectId: string) => {
    const res = await api.patch("/avatar-effects", {
        effectId
    });
    return res.data;
}