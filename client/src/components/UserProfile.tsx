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
import ProfileCard from "@/components/ProfileCard.tsx";
import { removeAvatar } from "../../api/visuals.ts";
import {toast} from "sonner";
import { removeAvatarEffect } from "../../api/effects.ts";


const UserProfile = ({ user, setUser }: ProfileProps) => {

    const handleRemoveAvatar = async () => {
        const res = await removeAvatar();
        setUser(res.updatedUser);
        toast.success("Avatar removed successfully.");
    }

    const handleRemoveAvatarEffect = async () => {
        const res = await removeAvatarEffect();
        setUser(res.user);
        toast(res.message);
    }


    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <ProfileCard user={user} />
                <div className="user-settings">
                    <Dialog>
                        <DialogTrigger>
                            Settings
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>User Settings</DialogTitle>
                                <DialogDescription className="flex flex-col gap-2">
                                    <div>
                                        <UploadUserAvatar user={user} setUser={setUser}/>
                                        <button onClick={handleRemoveAvatar}>Remove avatar</button>
                                    </div>
                                    <div>
                                        <button onClick={handleRemoveAvatarEffect}>Remove avatar effect</button>
                                    </div>
                                    <SignOut setUser={setUser}/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;