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


const UserProfile = ({ user, setUser }: ProfileProps) => {

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
                                <DialogDescription>
                                    <UploadUserAvatar user={user} setUser={setUser}/>
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