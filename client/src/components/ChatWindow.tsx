import { useContext, useEffect, useState } from 'react';
import UserAvatar from "@/components/UserAvatar.tsx";
import {SocketContext} from "@/components/SocketContext.tsx";
import type { ChatWindowProps } from "../../types/types.ts";
import { sendMessage } from "../../api/socket.ts";
import {fetchMessages} from "../../api/message.ts";


const ChatWindow = ({ loggedInUser, selectedUser }: ChatWindowProps) => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const socketContext = useContext(SocketContext);

    const handleSend = () => {
        const messageType = "text";
        const receiverId = selectedUser?.userId;
        console.log(selectedUser);
        sendMessage({ receiverId, inputMessage, messageType});
        setInputMessage("");
    }

    // runs once
    useEffect(() => {
        const fetchChatHistory = async () => {
            const userId = selectedUser.userId;
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
        <div>
            <div className="h-100 overflow-y-auto">
                <UserAvatar user={selectedUser} previewEffectId="" size="sm" />
                <p>{selectedUser?.identity?.displayName}</p>
            </div>
            <div>
                { messages && messages?.map((message) => (
                    <div
                        key={message?._id}
                        className={message.sender === loggedInUser.userId._id? 'text-purple-600': 'text-gold'}
                    >
                        {message?.message}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;