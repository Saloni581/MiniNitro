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
import { avatarEffects } from "../../effectsConfig.ts";
// import randomImg from "../public/settings.png";


const ProfileCard = ({ user, setUser }: ProfileProps) => {

    console.log(user);

    const userIdentity = user?.identity;
    const avatarUrl = user?.visuals?.avatar?.activeAssetId?.url;
    const effectId = user?.visuals?.avatar?.decorations?.activeEffect;

    const activeEffect = avatarEffects.filter((effect) => effect.id === effectId);
    const activeEffectCN = activeEffect[0].cssClass;

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <div className={`user-avatar ${activeEffectCN}`} >
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
                        {user?.userId?.userName}
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