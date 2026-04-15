import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import UploadUserAvatar from "@/components/visuals/UploadUserAvatar.tsx";
import ThemePicker from "@/components/visuals/ThemePicker.tsx";
import DisplayNameStyle from "@/components/visuals/DisplayNameStyle.tsx";
import SignOut from "@/components/auth/SignOut.tsx";
import { removeAsset } from "../../api/visuals.ts";
import {toast} from "sonner";
import {removeAvatarEffect} from "../../api/effects.ts";
import type {ProfileProps} from "../../types/types.ts";
import ProfileBanner from "@/components/visuals/ProfileBanner.tsx";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import {Link} from "react-router-dom";

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
        <div>
            <Sheet>
                <SheetTrigger>
                    <UserAvatar user={user} previewEffectId="" size="sm" />
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto sheet-scroll m-4">
                        <div>
                            <Link to="/profile">view profile</Link>
                        </div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>User Avatar</AccordionTrigger>
                                <AccordionContent>
                                    <UploadUserAvatar user={user} setUser={setUser}/>
                                    <button onClick={handleRemoveAvatar}>Remove avatar</button>
                                    <div>
                                        <button onClick={handleRemoveAvatarEffect}>Remove avatar effect</button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Profile Theme</AccordionTrigger>
                                <AccordionContent>
                                    <ThemePicker user={user} setUser={setUser} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Display Name Style</AccordionTrigger>
                                <AccordionContent>
                                    <DisplayNameStyle user={user} setUser={setUser} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Profile Banner</AccordionTrigger>
                                <AccordionContent>
                                    <ProfileBanner user={user} setUser={setUser} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <SheetFooter>
                        <SignOut setUser={setUser} />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default UserSettings;