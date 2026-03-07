import { io } from "socket.io-client"
const url = "http://localhost:3000";

export const socket = io(url, { autoConnect: false });

export const connectToSocket = () => {
    socket.connect();
}

socket.on("messageSent", (content) => {
    console.log(content);
});

socket.on("receiveMessage", (content) => {
    console.log(content);
});

socket.on('error', ({ message }) => {
    console.log(message);
})
