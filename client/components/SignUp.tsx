import { useState } from "react";
import { signUp } from "../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../types.ts";

const SignUp = ({ setUser }: SetUserProps) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signUp({ userName, email, password });
        setUser(res.data);
        navigate("/profile-form");
    }

    return (
        <>
        <form onSubmit={userSignUp}>
            <input
                type="text"
                placeholder="enter a unique userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
        <div>
            <p>
                Already Have an account?
                <Link to="/login">
                    SignIn
                </Link>
            </p>
        </div>
        </>
    );
};

export default SignUp;