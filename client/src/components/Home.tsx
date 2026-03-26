import { fetchAllUsers } from "../../api/user.ts";
import { useEffect, useState} from "react";
import type { UserProfileProps } from "../../types/types.ts";
import UsersList from "@/components/UsersList.tsx";
import { fetchConversationsOfLoggedInUser } from "../../api/conversation.ts";

type loggedInUserProps = {
    loggedInUser: UserProfileProps | null;
}

const Home = ({ loggedInUser } : loggedInUserProps ) => {
    const [users, setUsers] = useState<UserProfileProps[]>([]);
    const [myConversations, setMyConversations] = useState<UserProfileProps[]>([]);

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
        <div>
            {
                loggedInUser? (
                    <div className="grid-container">
                        <UsersList users={myConversations} isMyChats={true} />
                        <UsersList users={filteredUsers} isMyChats={false} />
                    </div>
                ) : (
                    <div>Home Page</div>
                )
            }
        </div>
    );
};

export default Home;