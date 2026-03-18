import { fetchAllUsers } from "../../api/user.ts";
import {useContext, useEffect, useState} from "react";
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
import { SocketContext } from "@/components/SocketContext.tsx";
import { useNavigate } from "react-router-dom";
import {fetchConversationsOfLoggedInUser} from "../../api/conversation.ts";

type loggedInUserProps = {
    loggedInUser: UserProfileProps | null;
}

type onlineUsersProps = {
    onlineUsers: { string: string},
}

const Home = ({ loggedInUser } : loggedInUserProps ) => {
    const [users, setUsers] = useState<UserProfileProps[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({});
    const [myConversations, setMyConversations] = useState<UserProfileProps[]>([]);
    const navigate = useNavigate();

    const socketContext = useContext(SocketContext);

    // show user online status
    useEffect(() => {
        socketContext?.socket.on("userOnline", ({ onlineUsers }: onlineUsersProps) => {
            setOnlineUsers(onlineUsers);
        });

        socketContext?.socket.on("userOffline", ({ onlineUsers }: onlineUsersProps) => {
            setOnlineUsers(onlineUsers);
        });

        return () => {
            socketContext?.socket.off("userOnline");
            socketContext?.socket.off("userOffline");
        }
    }, [socketContext?.socket]);


    useEffect(() => {
        const renderAllUsers = async () => {
            const result = await fetchAllUsers();
            setUsers(result.users);
        }

        renderAllUsers();
    }, []);


    const handleSelectedUser = ( selectedUser : UserProfileProps ) => {
        navigate(`/chat/${selectedUser.userId}`);
    }


    const filteredUsers = users.filter((user) => user.userId !== loggedInUser?.userId);


    useEffect(() => {
        const fetchConnectedUsers =  async () => {
            const res = await fetchConversationsOfLoggedInUser();
            setMyConversations(res.conversations);
        }

        fetchConnectedUsers();
    }, []);

    return (
        <div className="flex md:flex-row flex-col md:justify-between gap-6 p-2">
            <div>
                <h1>My Chats</h1>
                {myConversations && myConversations?.map((eachUser) => (
                    <div key={eachUser._id} className="user-nameplate">
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
                            <div>
                                { onlineUsers?.[eachUser?.userId]?
                                    <span className="text-green-400 text-sm font-bold">Online</span> :
                                    <span className="text-gray-400 text-sm font-bold">Offline</span>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h1>All Users</h1>
                {filteredUsers && filteredUsers?.map((eachUser) => (
                    <div key={eachUser._id} className="user-nameplate">
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
                            <div>
                                { onlineUsers?.[eachUser?.userId]?
                                    <span className="text-green-400 text-sm font-bold">Online</span> :
                                    <span className="text-gray-400 text-sm font-bold">Offline</span>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;