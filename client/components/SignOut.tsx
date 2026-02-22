import { signOut } from "../api/auth";
import type { SetUserProps } from "../types.ts";
import {useNavigate} from "react-router-dom";

const SignOut = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const userSignOut = async () => {
        await signOut();
        setUser(null);
        navigate("/login");
    }

    return (
        <div>
           <button onClick={userSignOut}>SignOut</button>
        </div>
    );
};

export default SignOut;