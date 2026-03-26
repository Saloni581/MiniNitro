import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import UserAvatar from "@/components/UserAvatar.tsx";
import ProfileCard from "@/components/ProfileCard.tsx";
import type { UserProfileProps, UsersListProps } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";


const UsersList = ({ users, isMyChats }: UsersListProps) => {
    const navigate = useNavigate();

    const handleSelectedUser = ( selectedUser : UserProfileProps ) => {
        navigate(`/chat/${selectedUser.userId}`);
    }


    return (
        <div className="users-list">
            <div>
                {
                    isMyChats? <h1>My Chats</h1> : <h1>All Users</h1>
                }
            </div>
                {
                    users.length !== 0 ?
                        (users?.map((eachUser) => (
                            // nameplate effect structure
                                <div key={eachUser._id} className={
                                    cn("relative",
                                    )}
                                >
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
                                    <div className="user-nameplate z-20">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div>
                                                    <UserAvatar user={eachUser} previewEffectId="" size="md" isChatWindow={false}/>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogDescription>
                                                        <div className="flex flex-col justify-center items-center">
                                                            <ProfileCard user={eachUser} />
                                                        </div>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                        <div className="flex flex-col gap-4 items-center">
                                            <p>{eachUser?.identity?.displayName}</p>
                                            <button
                                                onClick={() => {
                                                    handleSelectedUser(eachUser);
                                                }}
                                            >
                                                {
                                                    isMyChats? "message" : "connect"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {/* overlay layer */}
                                    <div
                                        className={
                                        cn("absolute z-30 inset-0 pointer-events-none",)
                                        }
                                    ></div>
                                </div>
                        ))): (
                            <div>Nothing to show here...</div>
                        )}
        </div>
    );
};

export default UsersList;