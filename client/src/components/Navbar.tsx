import { Link } from 'react-router-dom';
import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";

type UserProps = {
    user: UserProfileProps | null;
}

const Navbar = ({ user }: UserProps) => {

    return (
        <nav className="navbar">
            <div>
                <Link to='/' >
                    Minitro
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/effects">
                    Effects
                </Link>
                {
                    user? (
                        <Link to='/profile'>
                            <UserAvatar user={user} previewEffectId="" size="sm" />
                        </Link>
                    ) : (
                        <Link to='/signup'>
                            <button>sign up for free</button>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;