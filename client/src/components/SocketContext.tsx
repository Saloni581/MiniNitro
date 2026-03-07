import { type ReactNode, createContext } from 'react';
import { socket, connectToSocket } from "../../api/socket.ts";

type SocketContextType = {
    socket: any,
    connectToSocket: () => void,
}

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SocketContext.Provider value={{ socket, connectToSocket }}>
            {children}
        </SocketContext.Provider>
    )
}
