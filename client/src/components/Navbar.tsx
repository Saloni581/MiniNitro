import { Link } from 'react-router-dom';
import type { UserProfileProps } from "../../types/types.ts";

type UserProps = {
    user: UserProfileProps | null;
}

const Navbar = (user: UserProps) => {

    return (
        <nav className="navbar">
            <Link to='/' >
                Home
            </Link>
            {
                user?.user?
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