import { useContext, useEffect, useState } from 'react';
import { SocketContext } from "@/components/SocketContext.tsx";
import type { ChatWindowProps, UserProfileProps } from "../../types/types.ts";
import { sendMessage } from "../../api/socket.ts";
import { fetchMessages } from "../../api/message.ts";
import MessageCard from "@/components/MessageCard.tsx";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../api/user.ts";
import UsersList from "@/components/UsersList.tsx";
import { fetchConversationsOfLoggedInUser } from "../../api/conversation.ts";


const ChatPage = ({ loggedInUser }: ChatWindowProps) => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfileProps | null>(null);
    const socketContext = useContext(SocketContext);
    const [myConversations, setMyConversations] = useState<UserProfileProps[]>([]);

    const { userId } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if(userId) {
               const user = await fetchUserById(userId);
               setSelectedUser(user.data);
            }
        }

        fetchUserDetails();

    }, [userId]);

    const handleSend = () => {
        const messageType = "text";
        const receiverId = selectedUser?.userId;
        if(receiverId) {
            sendMessage({ receiverId, inputMessage, messageType});
            setInputMessage("");
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && inputMessage.trim() !== "") {
            handleSend();
        }
    }

    // runs once
    useEffect(() => {
        const fetchChatHistory = async () => {
            const userId = selectedUser?.userId;
            if(userId) {
                const oldMessages = await fetchMessages({ userId });
                setMessages(oldMessages);
            }
        }

        fetchChatHistory();
    }, [selectedUser]);


    // runs on mount
    useEffect(() => {
        console.log("socket connected?", socketContext?.socket.connected);
        socketContext?.socket.on("receiveMessage", (newMessage: any) => {
            if(newMessage.sender === selectedUser?.userId) {
                setMessages(prev => [...prev, newMessage]);
            }
        });

        socketContext?.socket.on("messageSent", (newMessage: any) => {
            setMessages(prev => [...prev, newMessage]);
        });

        socketContext?.socket.on('error', ({ message }: any) => {
            console.log(message);
        })

        return () => {
            socketContext?.socket.off("receiveMessage");
            socketContext?.socket.off("messageSent");
        }

    }, [socketContext?.socket]);


    useEffect(() => {
        const fetchConnectedUsers =  async () => {
            const res = await fetchConversationsOfLoggedInUser();
            setMyConversations(res.conversations);
        }

        fetchConnectedUsers();
    }, [loggedInUser]);

    return (
        <div className="grid-container">
            <div>
                <UsersList users={myConversations} isMyChats={true} />
            </div>
            <div className="chat-window-container-outer">
                <div className="chat-window-container">
                    <div>
                        { messages && messages?.map((message) => (
                            <div
                                key={message?._id}
                            >
                                <MessageCard user={message?.sender === loggedInUser?.userId? loggedInUser : selectedUser } message={message?.message} />
                            </div>
                        ))}
                    </div>
                    <div className="send-message-container">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="text-brand-text-secondary w-full"
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;