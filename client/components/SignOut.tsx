import { signOut } from "../api/auth";
import type { SignInProps } from "../types.ts";
import {useNavigate} from "react-router-dom";

const SignOut = ({ setUser }: SignInProps) => {
    const navigate = useNavigate();

    const userSignOut = async () => {
        await signOut();
        setUser(null);
        navigate("/");
    }

    return (
        <div>
           <button onClick={userSignOut}>SignOut</button>
        </div>
    );
};

export default SignOut;