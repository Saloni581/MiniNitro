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
        <div className="min-h-screen flex flex-col justify-between">
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
            <footer className="flex flex-col gap-2 justify-center mb-2">
                <div className="flex justify-center gap-4">
                    <p>Socials:</p>
                    <div className="flex gap-1 md:gap-8">
                        <a href="https://www.linkedin.com/in/saloni-lathwariya-77a268371/">LinkedIn</a>
                        <a href="https://x.com/Saloni_581">X</a>
                        <a href="https://github.com/Saloni581">GitHub</a>
                        <a href="https://discord.gg/7p7qYE74">Discord</a>
                    </div>
                </div>
                <div className="text-muted-foreground text-xs text-center">
                    <p>Made with obsession by saloni lathwariya</p>
                    <p>All rights reserved | &copy; 2026 miniNitro</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;