import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import UploadUserAvatar from "@/components/visuals/UploadUserAvatar.tsx";
import ThemePicker from "@/components/visuals/ThemePicker.tsx";
import DisplayNameStyle from "@/components/visuals/DisplayNameStyle.tsx";
import SignOut from "@/components/auth/SignOut.tsx";
import { removeAsset } from "../../api/visuals.ts";
import {toast} from "sonner";
import {removeAvatarEffect} from "../../api/effects.ts";
import type {ProfileProps} from "../../types/types.ts";
import settingsIcon from "@/assets/settings-icon.gif";
import ProfileBanner from "@/components/visuals/ProfileBanner.tsx";

const UserSettings = ({ user, setUser }: ProfileProps) => {
    const handleRemoveAvatar = async () => {
        const res = await removeAsset({ isAvatarAsset: true });
        setUser(res.updatedUser);
        toast.success("Avatar removed successfully.");
    }

    const handleRemoveAvatarEffect = async () => {
        const res = await removeAvatarEffect();
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div className="user-settings">
            <Dialog>
                <DialogTrigger
                    style={{
                        color: "color-mix(in srgb, var(--color-primary) 35%, var(--color-surface)",
                        background: "color-mix(in srgb, var(--color-accent) 15%, var(--color-text-primary)"
                    }}
                >
                    <img src={settingsIcon} alt="settings icon" height={30} width={30} />
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
                            <div>
                                <ThemePicker user={user} setUser={setUser} />
                            </div>
                            <div>
                                <DisplayNameStyle user={user} setUser={setUser} />
                            </div>
                            <div>
                                <ProfileBanner user={user} setUser={setUser} />
                            </div>
                            <SignOut setUser={setUser}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserSettings;