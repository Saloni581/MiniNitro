import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signUp = async ({ userId, email, password } : {
    userId: string;
    email: string;
    password: string;
}) => {
    console.log("Calling signup API");
    const res = await api.post(
            "/auth/signup", // url
            { userId, email, password }, // data
        );
    console.log("API BASE:", api.defaults.baseURL);
    return res.data;
}

export const signIn = async ({ email, password } : {
    email: string;
    password: string;
}) => {
    console.log("Calling signup API");
    const res = await api.post(
        "/auth/signin", // url
        { email, password }, // data
    );
    console.log("API BASE:", api.defaults.baseURL);
    return res.data;
}