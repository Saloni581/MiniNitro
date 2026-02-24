import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../types.ts";
import UserAvatar from "./UserAvatar.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = ({ user, setUser }: ProfileProps) => {

    console.log(user)

    const userIdentity = user?.data?.identity;
    const avatarUrl = user?.data?.visuals?.avatar?.activeAssetId?.url;

    return (
        <div className="profile-card-container">
            <div className="profile-card">
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

                <div>
                    <Avatar>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>

                <div>
                    <p className="text-2xl">Settings</p>
                    <UserAvatar user={user} setUser={setUser} />
                    <SignOut setUser={setUser} />
                </div>
            </div>
        </div>
    );
};

export default Profile;