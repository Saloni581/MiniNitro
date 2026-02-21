// import React from 'react';

import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";

const Profile = ({ user, setUser }: ProfileProps) => {

    // @ts-ignore
    const userName = user?.data?.identity?.displayName;

    return (
        <div>
            {
                userName &&
                    (
                        `Welcome ${userName}! It's so good to see you!`
                    )
            }
            <SignOut setUser={setUser} />
        </div>
    );
};

export default Profile;