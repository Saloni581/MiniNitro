import { Link } from 'react-router-dom';
import type { ProfileProps } from "../../types/types.ts";
import UserSettings from "@/components/UserSettings.tsx";


const Navbar = ({ user, setUser }: ProfileProps) => {

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
                        <UserSettings user={user} setUser={setUser} />
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