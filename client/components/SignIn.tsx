import { useState } from 'react';
import {signIn} from "../api/auth.ts";

const SignIn = () => {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const userSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn({ identifier, password });
        console.log(res);
    }

    return (
        <form onSubmit={userSignIn}>
            <input
                type='text'
                placeholder="Email or userId"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
            />
            <input
                type="password"
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