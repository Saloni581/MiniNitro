import jwt from "jsonwebtoken";
import Conversation from "../db/models/conversationSchema.js";
import Message from "../db/models/messageSchema.js";

export let onlineUsers = {};

export const initSocket = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.cookies.token;
        try {
            if(token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(decoded) {
                    socket.userId = decoded.id;
                }
            }
        } catch (error) {
            return next(new Error('Could not connect to socket server'));
        }
        next();
    });

    io.on("connection", (socket) => {
        onlineUsers[socket.userId] = socket.id;

        socket.on("sendMessage", async ({ receiverId, message, messageType }) => {
            try {
                // 1) find if there is a room already exists for both these users -> if not create one
                let conversation = await Conversation.findOne({
                    participants: {
                        $all: [socket.userId, receiverId],
                    }
                });
                if (!conversation) {
                    conversation = new Conversation({
                        participants: [socket.userId, receiverId],
                    });
                    await conversation.save();
                }
                // 2) create new message and save to db
                const content = new Message({
                    room: conversation._id,
                    sender: socket.userId,
                    receiver: receiverId,
                    messageType,
                    message,
                });
                await content.save();

                // send to sender
                const senderSocketId = onlineUsers[socket.userId];
                io.to(senderSocketId).emit('messageSent', content);

                // 3) check if receiver online and emit
                if(onlineUsers[receiverId]) {
                    // emit the message to receiver
                    const receiverSocketId = onlineUsers[receiverId];
                    io.to(receiverSocketId).emit("receiveMessage", content);
                    // update status in message
                    content.status = "delivered";
                    await content.save();
                }
            } catch (error) {
                socket.emit('error', { message: "Message could not be sent" } );
            }
        });

        socket.on('disconnect', () => {
            delete onlineUsers[socket.userId];
        });
    });
}

