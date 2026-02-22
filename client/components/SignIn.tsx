import { useState } from 'react';
import { signIn } from "../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../types.ts";
import { fetchUserDetails } from "../api/user.ts";

const SignIn = ({ setUser } : SetUserProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn({ email, password });
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
        navigate("/profile");
    }

    return (
        <>
        <form onSubmit={userSignIn}>
            <input
                type='text'
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">SignIn</button>
        </form>
            <div>
                <p>
                    Don't have an account?
                    <Link to="/signup">
                        SignUp
                    </Link>
                </p>
            </div>
        </>
    );
};

export default SignIn;