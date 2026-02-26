import { useState } from "react";
import { signUp } from "../../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../../types.ts";
import { fetchUserDetails } from "../../api/user.ts";

const SignUp = ({ setUser }: SetUserProps) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUp({ userName, email, password });
        const user = await fetchUserDetails();
        setUser(user.data);
        navigate("/profile-form");
    }

    return (
        <>
        <form onSubmit={userSignUp} className="auth-form">
            <input
                type="text"
                placeholder="enter a unique username"
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
        <div className="auth-div">
            <p>Already Have an account?</p>
            <div className="text-brand-primary-bold">
                <Link to="/login">
                    SignIn
                </Link>
            </div>
        </div>
        </>
    );
};

export default SignUp;