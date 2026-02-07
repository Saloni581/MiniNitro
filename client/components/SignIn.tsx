import { useState } from 'react';
import {signIn} from "../api/auth.ts";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn({ email, password });
        console.log(res.data);
    }

    return (
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
    );
};

export default SignIn;