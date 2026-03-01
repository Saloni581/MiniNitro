import { Link } from 'react-router-dom';
import type { UserProps } from "../../types/types.ts";

const Navbar = ({ user }: UserProps) => {

    return (
        <nav className="navbar">
            <Link to='/' >
                Home
            </Link>
            {
                user?
                    <Link to='/profile'>
                        Profile
                    </Link>
                    : <Link to='/login'>
                        Login
                    </Link>
            }
            <Link to="/effects">
                Effects
            </Link>
        </nav>
    );
};

export default Navbar;