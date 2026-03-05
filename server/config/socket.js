import jwt from "jsonwebtoken";

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

        socket.on('disconnect', () => {
            delete onlineUsers[socket.userId];
        })
    });
}

