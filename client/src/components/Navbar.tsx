import { Link } from 'react-router-dom';
import type { ProfileProps } from "../../types/types.ts";
import UserSettings from "@/components/UserSettings.tsx";


const Navbar = ({ user, setUser }: ProfileProps) => {

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
                        <UserSettings user={user} setUser={setUser} />
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