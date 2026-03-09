import { useContext, useEffect, useState } from 'react';
import {SocketContext} from "@/components/SocketContext.tsx";
import type { ChatWindowProps } from "../../types/types.ts";
import { sendMessage } from "../../api/socket.ts";
import {fetchMessages} from "../../api/message.ts";
import MessageCard from "@/components/MessageCard.tsx";


const ChatWindow = ({ loggedInUser, selectedUser }: ChatWindowProps) => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const socketContext = useContext(SocketContext);

    const handleSend = () => {
        const messageType = "text";
        const receiverId = selectedUser?.userId;
        sendMessage({ receiverId, inputMessage, messageType});
        setInputMessage("");
    }

    // runs once
    useEffect(() => {
        const fetchChatHistory = async () => {
            const userId = selectedUser?.userId;
            const oldMessages = await fetchMessages({ userId });
            setMessages(oldMessages);
        }

        fetchChatHistory();
    }, [selectedUser]);


    // runs on mount
    useEffect(() => {
        console.log("socket connected?", socketContext?.socket.connected);
        socketContext?.socket.on("receiveMessage", (newMessage: any) => {
            setMessages(prev => [...prev, newMessage]);
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

    return (
        <div className="chat-window-container-outer">
            <div>
                <div>
                    { messages && messages?.map((message) => (
                        <div
                            key={message?._id}
                        >
                            <MessageCard user={message?.sender === loggedInUser?.userId? loggedInUser : selectedUser } message={message?.message} />
                        </div>
                    ))}
                </div>
                <div className="p-2 flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="text-brand-text-secondary w-full"
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;