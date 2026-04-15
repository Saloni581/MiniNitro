import { signOut } from "../../../api/auth.ts";
import type { SetUserProps } from "../../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignOut = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const userSignOut = async () => {
        try {
            const res = await signOut();
            setUser(null);
            toast(res.message);
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast("Error while logging user out");
        }
    }

    return (
        <div>
           <button
               onClick={userSignOut}
               className="btn-destructive"
           >Signout</button>
        </div>
    );
};

export default SignOut;