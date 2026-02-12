// import React from 'react';
import { Link } from 'react-router-dom';

const Effects = () => {
    return (
        <div>
            <Link to='/profile-effects'>
                Profile Effects
            </Link>
            <Link to='/avatar-effects'>
                Avatar Effects
            </Link>
            <Link to='/nameplate-effects'>
                Nameplate Effects
            </Link>
        </div>
    );
};

export default Effects;