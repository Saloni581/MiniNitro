import SignOut from "./SignOut.tsx";
import type { ProfileProps } from "../../types.ts";
import UserAvatar from "./UserAvatar.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog.tsx";
// import randomImg from "../public/settings.png";


const ProfileCard = ({ user, setUser }: ProfileProps) => {

    console.log(user)

    const userIdentity = user?.data?.identity;
    const avatarUrl = user?.data?.visuals?.avatar?.activeAssetId?.url;

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <div className="user-avatar user-avatar-glow-effect">
                    <Avatar>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
                <div>{userIdentity?.displayName}</div>
                <div>
                    <span>
                        {userIdentity?.pronouns} &middot;
                    </span>
                    <span>
                        {user?.data.userId?.userName}
                    </span>
                </div>
                <div>
                    {
                        userIdentity?.bio === ""?
                            "No bio" :
                            <p>
                                {userIdentity?.bio}
                            </p>
                    }
                </div>
                <div className="user-settings">
                    <Dialog>
                        <DialogTrigger>
                            Settings
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>User Settings</DialogTitle>
                                <DialogDescription>
                                    <UserAvatar user={user} setUser={setUser} />
                                    <SignOut setUser={setUser} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;