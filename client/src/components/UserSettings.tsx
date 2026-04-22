import UploadUserAvatar from "@/components/visuals/UploadUserAvatar.tsx";
import ThemePicker from "@/components/visuals/ThemePicker.tsx";
import DisplayNameStyle from "@/components/visuals/DisplayNameStyle.tsx";
import SignOut from "@/components/auth/SignOut.tsx";
import { removeAsset } from "../../api/visuals.ts";
import { toast } from "sonner";
import { removeAvatarEffect, removeNameplateEffect, removeProfileEffect } from "../../api/effects.ts";
import type { ProfileProps } from "../../types/types.ts";
import ProfileBanner from "@/components/visuals/ProfileBanner.tsx";
import UserProfile from "@/components/UserProfile.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

const UserSettings = ({ user, setUser }: ProfileProps) => {
    const navigate = useNavigate();

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

    const handleRemoveProfileEffect = async () => {
        const res = await removeProfileEffect();
        setUser(res.user);
        toast(res.message);
    }

    const handleRemoveNameplateEffect = async () => {
        const res = await removeNameplateEffect();
        setUser(res.user);
        toast(res.message);
    }

    const handleEditProfile = () => {
        navigate("/edit-profile")
    }

    const settingOptions = [
        {
            title: "User Avatar",
            content: (
                <div className="options-heading flex flex-col gap-4">
                    <div>
                        <UploadUserAvatar user={user} setUser={setUser}/>
                    </div>
                    <button
                        onClick={handleRemoveAvatar}
                        className="btn-ghost"
                    >Remove avatar</button>
                </div>
            )
        },
        {
            title: "Profile Theme",
            content: (
                <div>
                    <ThemePicker user={user} setUser={setUser} />
                </div>
            )
        },
        {
            title: "Display Name Style",
            content: (
                <div>
                    <DisplayNameStyle user={user} setUser={setUser} />
                </div>
            )
        },
        {
            title: "Profile Banner",
            content: (
                <div>
                    <ProfileBanner user={user} setUser={setUser} />
                </div>
            )
        },
        {
            title: "Remove Decorations",
            content: (
                <div>
                    <button
                        onClick={handleRemoveAvatarEffect}
                        className="btn-ghost"
                    >Remove avatar effect</button>
                    <button
                        onClick={handleRemoveProfileEffect}
                        className="btn-ghost"
                    >Remove profile effect</button>
                    <button
                        onClick={handleRemoveNameplateEffect}
                        className="btn-ghost"
                    >Remove nameplate effect</button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-evenly gap-2 py-4 md:py-8">
            <div className="w-80 md:85 lg:w-90 h-120 bg-surface-alt rounded-2xl p-4 flex flex-col overflow-hidden">
                <h1 className="heading">Settings</h1>
                <div className="flex-1 flex flex-col overflow-y-auto sheet-scroll p-4">
                    <Button className="btn-primary" onClick={handleEditProfile}>
                        Edit profile
                    </Button>
                    <div>
                        {
                            settingOptions.map((setting) => (
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="shipping"
                                    className="max-w-lg border-b border-b-border-strong"
                                    key={setting.title}
                                >
                                    <AccordionItem value="shipping">
                                        <AccordionTrigger>
                                            <p className="font-medium text-lg">{setting.title}</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            { setting.content }
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <SignOut setUser={setUser} />
                </div>
            </div>
            <div className="w-80 md:w-96 lg:w-150">
                <UserProfile user={user} />
            </div>
        </div>
    );
};

export default UserSettings;