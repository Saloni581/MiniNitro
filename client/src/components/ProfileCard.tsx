import SignOut from "./auth/SignOut.tsx";
import type { ProfileProps } from "../../types/types.ts";
import UploadUserAvatar from "./UploadUserAvatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog.tsx";
import UserAvatar from "@/components/UserAvatar.tsx";


const ProfileCard = ({ user, setUser }: ProfileProps) => {

    console.log(user)
    const userIdentity = user?.identity;

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <UserAvatar user={user} />
                <div>{userIdentity?.displayName}</div>
                <div>
                    <span>
                        {user?.userId?.userName}&middot;
                    </span>
                    <span>
                        {userIdentity?.pronouns}
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
                                    <UploadUserAvatar user={user} setUser={setUser} />
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