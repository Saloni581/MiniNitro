import { io } from "socket.io-client"
import type { SocketSendMessageProps } from "../types/types.ts";
const url = import.meta.env.VITE_SERVER_URL;

export const socket = io(url, {
    autoConnect: false,
    withCredentials: true,
});

export const connectToSocket = () => {
    socket.connect();
}

export const sendMessage = ({ receiverId, inputMessage, messageType }: SocketSendMessageProps) => {
    const message = inputMessage;
    socket.emit("sendMessage", { receiverId, message, messageType });
}
