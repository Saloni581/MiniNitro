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

export const updateProfileEffect = async (effectId: string) => {
    const res = await api.patch("/profile-effects/active", {
        effectId
    });
    return res.data;
}

export const removeProfileEffect = async () => {
    const res = await api.patch("/profile-effects/active", {});
    return res.data;
}

export const updateNameplateEffect = async (effectId: string) => {
    const res = await api.patch("/nameplate-effects/active", {
        effectId
    });
    return res.data;
}

export const removeNameplateEffect = async () => {
    const res = await api.patch("/nameplate-effects/active", {});
    return res.data;
}