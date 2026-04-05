import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from "@/components/SocketContext.tsx";
import type { ChatWindowProps, UserProfileProps } from "../../types/types.ts";
import { sendMessage } from "../../api/socket.ts";
import { fetchMessages } from "../../api/message.ts";
import MessageCard from "@/components/MessageCard.tsx";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../api/user.ts";
import UsersList from "@/components/UsersList.tsx";
import { fetchConversationsOfLoggedInUser } from "../../api/conversation.ts";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import send from "@/assets/send.png";
import {formatTime} from "../../constants";


const ChatPage = ({ loggedInUser }: ChatWindowProps) => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfileProps | null>(null);
    const socketContext = useContext(SocketContext);
    const [myConversations, setMyConversations] = useState<UserProfileProps[]>([]);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const { userId } = useParams();

    // scroll to bottom whenever a new message arrives
    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current?.scrollHeight;
        }
    }, [messages]);

    // fetching selected user details through Id
    useEffect(() => {
        const fetchUserDetails = async () => {
            if(userId) {
               const user = await fetchUserById(userId);
               setSelectedUser(user.data);
            }
        }
        fetchUserDetails();
    }, [userId]);

    // send message
    const handleSend = () => {
        const messageType = "text";
        const receiverId = selectedUser?.userId;
        if(receiverId) {
            sendMessage({ receiverId, inputMessage, messageType});
            setInputMessage("");
        }
    }

    // send message on enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && inputMessage.trim() !== "") {
            handleSend();
        }
    }

    // fetches all previous chats - runs once when user select other user to chat
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


    // handling socket events - runs on mount when socket gets connected
    // socket listeners must re-register when selectedUser changes
    // otherwise they hold a stale reference to the old user (null on mount)
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

    }, [socketContext?.socket, selectedUser]);


    useEffect(() => {
        const fetchConnectedUsers =  async () => {
            const res = await fetchConversationsOfLoggedInUser();
            setMyConversations(res.conversations);
        }

        fetchConnectedUsers();
    }, [loggedInUser]);

    return (
        <div className="grid-container">
            <div className="chat-window-container-outer">
                <div className="chat-window-selected-user">
                    <UserAvatar user={selectedUser} previewEffectId={""} size={"sm"}/>
                    <span>
                        { selectedUser?.identity.displayName }
                    </span>
                </div>
                <div className="chat-window-container" ref={chatContainerRef}>
                    { messages && messages?.map((message) => (
                        <div
                            key={message?._id}
                            className="mb-2"
                        >
                            <MessageCard
                                user={message?.sender === loggedInUser?.userId? loggedInUser : selectedUser }
                                message={message?.message}
                                timestamps={formatTime(message.createdAt)}
                            />
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
                        placeholder="write something..."
                    />
                    <button onClick={handleSend}>
                        <img src={send} alt="send icon" className="w-6 h-6"/>
                    </button>
                </div>
            </div>
            <div>
                <UsersList users={myConversations} isMyChats={true} />
            </div>
        </div>
    );
};

export default ChatPage;