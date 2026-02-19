import { Link } from 'react-router-dom';
import type { NavbarProps } from "../types.ts";

const Navbar = ({ user }: NavbarProps) => {

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