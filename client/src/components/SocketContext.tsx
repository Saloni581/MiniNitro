import {type ReactNode, createContext, useState, useEffect } from 'react';
import { socket, connectToSocket } from "../../api/socket.ts";
import type { OnlineUsersProps } from "../../types/types.ts";

type SocketContextType = {
    socket: any,
    connectToSocket: () => void,
    onlineUsers: OnlineUsersProps | null
}

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<SocketContextType | null>(null);


export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUsersProps | null>(null);

    useEffect(() => {
        socket.on("userOnline", ({ onlineUsers }) => {
            setOnlineUsers(onlineUsers);
        });

        socket.on("userOffline", ({ onlineUsers }) => {
            setOnlineUsers(onlineUsers);
        });

        return () => {
            socket.off("userOnline");
            socket.off("userOffline");
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, connectToSocket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
