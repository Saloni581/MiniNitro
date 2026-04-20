import { fetchAllUsers } from "../../api/user.ts";
import { useEffect, useState} from "react";
import type { UserProfileProps } from "../../types/types.ts";
import UsersList from "@/components/UsersList.tsx";
import { fetchConversationsOfLoggedInUser } from "../../api/conversation.ts";
import LandingPage from "@/components/LandingPage.tsx";

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

    // excluding the loggedIn user from users array
    const filteredUsers = users?.filter((user) => user.userId !== loggedInUser?.userId);

    // excluding the users who are already connected with loggedIn user and keeping the ones with whom loggedIn user has not connected yet.
    const otherUsers = filteredUsers?.filter((user) => !myConversations.some((element) => element.userId === user.userId));

    return (
        <div>
            {
                loggedInUser? (
                    <div className="grid-container">
                        <div>
                            <h1 className="heading">My Chats</h1>
                            <UsersList users={myConversations}>
                                <button className="btn-ghost">Message</button>
                            </UsersList>
                        </div>
                        <div>
                            <h1 className="heading">Discover more users</h1>
                            <UsersList users={otherUsers}>
                                <button
                                    className="btn-ghost connect-btn"
                                    style={{
                                        color: "var(--color-success)",
                                        borderColor: "green",
                                    }}
                                >Connect</button>
                            </UsersList>
                        </div>
                    </div>
                ) : (
                    <div>
                        <LandingPage />
                    </div>
                )
            }
        </div>
    );
};

export default Home;