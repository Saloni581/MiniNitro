// import React from 'react';

import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";

const Profile = ({ user, setUser }: ProfileProps) => {

    console.log(user);

    return (
        <div>
            <p>
                Welcome {user?.userId}! It's so good to see you!
            </p>
            <SignOut setUser={setUser} />
        </div>
    );
};

export default Profile;