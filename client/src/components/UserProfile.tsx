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
import {cn} from "@/lib/utils.ts";

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
            <div className="relative user-profile">
                {/* glow layer */}
                <div className={
                    cn("absolute z-0 inset-0 pointer-events-none",
                    )}
                ></div>
                {/* border layer */}
                <div className={
                    cn("absolute z-10 inset-0 pointer-events-none",
                    )}
                ></div>
                {/* content layer */}
                <div className="profile-card absolute inset-0 z-20">
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
                {/* overlay layer */}
                <div
                    className={
                        cn("absolute z-30 inset-0 pointer-events-none",)
                    }
                ></div>
            </div>
        </div>
    );
};

export default UserProfile;