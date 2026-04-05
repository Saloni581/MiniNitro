import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/visuals",
    withCredentials: true
});

export const uploadAvatar = async ({ formData, isAvatarAsset }: {
    formData: FormData;
    isAvatarAsset : boolean;
}) => {
    formData.append("isAvatarAsset", String(isAvatarAsset));
    const result = await api.post(
        "/asset",
        formData,
    );
    return result.data;
}

export const removeAvatar = async () => {
    const res = await api.delete(
        "/avatar",
    );
    return res.data;
}

export const updateProfileTheme = async ({ primary, accent } : {
    primary: string;
    accent: string;
}) => {
    const res = await api.patch("/theme", { primary, accent });
    return res.data;
}

export const removeProfileTheme = async () => {
    const res = await api.patch("/theme", {});
    return res.data;
}

export const updateDisplayNameStyle = async ({ color, fontId, effect }: {
    color: string;
    fontId: string;
    effect: string;
}) => {
    const res = await api.patch("/display-name-style", { color, fontId, effect });
    return res.data;
}

export const removeDisplayNameStyle = async () => {
    const res = await api.patch("/display-name-style", {});
    return res.data;
}