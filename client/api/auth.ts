import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// SignUp
export const signUp = async ({ userId, email, password } : {
    userId: string;
    email: string;
    password: string;
}) => {
    const res = await api.post(
            "/auth/signup", // url
            { userId, email, password }, // data
        );
    return res.data;
}

// SignIn
export const signIn = async ({ email, password } : {
    email: string;
    password: string;
}) => {
    const res = await api.post(
        "/auth/signin", // url
        { email, password }, // data
    );
    return res.data;
}

// SignOut
export const signOut = async () => {
    const res = await api.post(
        "/auth/signout", // url
    );
    return res.data;
}