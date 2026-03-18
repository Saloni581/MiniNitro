import { fetchAllUsers } from "../../api/user.ts";
import {useContext, useEffect, useState} from "react";
import type { UserProfileProps } from "../../types/types.ts";
import { SocketContext } from "@/components/SocketContext.tsx";
import UsersList from "@/components/UsersList.tsx";
import { fetchConversationsOfLoggedInUser } from "../../api/conversation.ts";

type loggedInUserProps = {
    loggedInUser: UserProfileProps | null;
}

type onlineUsersProps = {
    onlineUsers: { string: string},
}

const Home = ({ loggedInUser } : loggedInUserProps ) => {
    const [users, setUsers] = useState<UserProfileProps[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>(null);
    const [myConversations, setMyConversations] = useState<UserProfileProps[]>([]);

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


    useEffect(() => {
        const fetchConnectedUsers =  async () => {
            const res = await fetchConversationsOfLoggedInUser();
            setMyConversations(res.conversations);
        }

        fetchConnectedUsers();
    }, [loggedInUser]);


    const filteredUsers = users.filter((user) => user.userId !== loggedInUser?.userId);

    return (
        <div className="flex md:flex-row flex-col md:justify-between gap-6 p-2">
            <UsersList users={myConversations} onlineUsers={onlineUsers} isMyChats={true} />
            <UsersList users={filteredUsers} onlineUsers={onlineUsers} isMyChats={false} />
        </div>
    );
};

export default Home;