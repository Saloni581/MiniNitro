// import React from 'react';

import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";
import UserAvatar from "./UserAvatar.tsx";

const Profile = ({ user, setUser }: ProfileProps) => {

    // @ts-ignore
    const userIdentity = user?.data?.identity;

    return (
        <div>
            <p>Welcome {userIdentity?.displayName}! It's so good to see you!</p>
            <p>Pronouns: {userIdentity?.pronouns}</p>
            <p>
                {
                    userIdentity?.bio !== ""?
                        "No bio" :
                        <span>
                            {userIdentity?.bio}
                        </span>
                }
            </p>
            <img
                // @ts-ignore
                src={user?.data?.visuals?.avatar?.activeAssetId?.url}
                alt="User Avatar"
                className="rounded-full"
                width="200"
            />

            <div>
                <p className="text-2xl">Settings</p>
                <UserAvatar user={user} setUser={setUser} />
                <SignOut setUser={setUser} />
            </div>
        </div>
    );
};

export default Profile;