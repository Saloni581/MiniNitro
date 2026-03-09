import { fetchAllUsers } from "../../api/user.ts";
import { useEffect, useState } from "react";
import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/UserAvatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProfileCard from "@/components/ProfileCard.tsx";
import ChatWindow from "@/components/ChatWindow.tsx";

type loggedInUserProps = {
    loggedInUser: UserProfileProps | null;
}

const Home = ({ loggedInUser } : loggedInUserProps ) => {
    const [users, setUsers] = useState<UserProfileProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        const renderAllUsers = async () => {
            const result = await fetchAllUsers();
            setUsers(result.users);
        }

        renderAllUsers();
    }, []);

    const handleSelectedUser = ( selectedUser : UserProfileProps ) => {
        setSelectedUser(selectedUser);
    }

    const filteredUsers = users.filter((user) => user.userId !== loggedInUser?.userId);

    return (
        <div className="flex md:flex-row flex-col md:justify-between gap-6">
            {filteredUsers && filteredUsers?.map((eachUser) => (
                <div key={eachUser._id} className="flex items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div>
                                <UserAvatar user={eachUser} previewEffectId="" size="md" />
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
                            connect & message
                        </button>
                    </div>
                </div>
            ))}

            {
                selectedUser && (
                    <div className="p-4 h-130 overflow-y-auto">
                        <ChatWindow loggedInUser={loggedInUser} selectedUser={selectedUser} />
                    </div>
                )
            }
        </div>
    );
};

export default Home;