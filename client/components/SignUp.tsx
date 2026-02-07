import { useState } from "react";
import {signUp} from "../api/auth.ts";

const SignUp = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signUp({userId, email, password});
        console.log(res);
    }

    return (
        <form onSubmit={userSignUp}>
            <input
                type="text"
                placeholder="enter a unique userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="email"
                placeholder="enter email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="enter password"
                name="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;