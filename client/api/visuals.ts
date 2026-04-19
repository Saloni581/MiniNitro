import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/visuals" || "http://localhost:3000/api/visuals",
    withCredentials: true
});

export const uploadAsset = async ({ formData, isAvatarAsset }: {
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

export const removeAsset = async ({ isAvatarAsset } : {
    isAvatarAsset : boolean;
}) => {
    const res = await api.patch(
        "/asset",
        { isAvatarAsset },
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

export const updateProfileBannerColor = async ({ color } : {
    color: string;
}) => {
    const res = await api.patch("/banner-color", { color });
    return res.data;
}

export const removeProfileBannerColor = async () => {
    const res = await api.patch("/banner-color", {});
    return res.data;
}