// import React from 'react';

import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";
import UserAvatar from "./UserAvatar.tsx";

const Profile = ({ user, setUser }: ProfileProps) => {

    return (
        <div>
                {
                    user?.userName? <>
                            Welcome {user?.userName}! It's so good to see you!
                            <UserAvatar />
                            <SignOut setUser={setUser} />
                    </> :
                        <>
                            Please Login
                    </>
                }
        </div>
    );
};

export default Profile;