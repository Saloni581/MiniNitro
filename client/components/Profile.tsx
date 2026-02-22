// import React from 'react';

import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";
import UserAvatar from "./UserAvatar.tsx";

const Profile = ({ user, setUser }: ProfileProps) => {

    // @ts-ignore
    const userIdentity = user?.data?.identity;
    // @ts-ignore
    const avatarUrl = user?.data?.visuals?.avatar?.activeAssetId?.url;

    return (
        <div>
            <p>Welcome {userIdentity?.displayName}! It's so good to see you!</p>
            <p>Pronouns: {userIdentity?.pronouns}</p>
            <p>
                {
                    userIdentity?.bio === ""?
                        "No bio" :
                        <span>
                            {userIdentity?.bio}
                        </span>
                }
            </p>
            <img
                src={avatarUrl}
                alt="User Avatar"
                className={`rounded-full ${avatarUrl? "block": "hidden"}`}
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