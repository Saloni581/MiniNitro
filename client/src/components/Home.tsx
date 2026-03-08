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


const Home = ( loggedInUser : UserProfileProps ) => {
    const [users, setUsers] = useState<UserProfileProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        const renderAllUsers = async () => {
            const result = await fetchAllUsers();
            setUsers(result.users);
        }

        renderAllUsers();
    }, []);

    const handleSelectedUser = ( user : UserProfileProps) => {
        setSelectedUser(user);
    }

    const filteredUsers = users.filter((user) => user.userId !== loggedInUser?.user.userId._id);
    // console.log(filteredUsers);

    return (
        <div className="p-12">
            {filteredUsers?.map((eachUser) => (
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
                    <div>
                        <ChatWindow loggedInUser={loggedInUser.user} selectedUser={selectedUser} />
                    </div>
                )
            }
        </div>
    );
};

export default Home;