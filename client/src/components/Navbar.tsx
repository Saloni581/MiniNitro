import { Link } from 'react-router-dom';
import type { UserProps } from "../../types/types.ts";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";

const Navbar = ({ user }: UserProps) => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to='/' >
                    <span className="text-accent-primary">mini</span>Nitro
                </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-8">
                <Link to="/effects">
                    Effects
                </Link>
                {
                    user? (
                        <Link to="/settings-panel">
                            <UserAvatar user={user} previewEffectId="" showStatus={false} size="sm"/>
                        </Link>
                    ) : (
                        <Link to='/signup'>
                            <button className="btn-primary text-nowrap">Sign up free</button>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;