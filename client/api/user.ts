import axios from "axios";
import type { GetUserResponse, ProfileDetailsProps} from "../types/types.ts";

const api = axios.create({
    baseURL: "http://localhost:3000/api/user",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const saveProfileDetails = async ({ displayName, pronouns, bio }: ProfileDetailsProps) => {
    const result = await api.post(
        "/profile",
        {
            displayName,
            pronouns,
            bio
        },
    );
    return result.data;
}

export const fetchUserDetails = async () => {
    const user = await api.get<GetUserResponse>('/me');
    return user.data;
}