import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import visualsRoutes from "./routes/visuals.routes.js";
import userRoutes from "./routes/user.routes.js";
import effectsRoutes from "./routes/effects.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import connectToDB from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket/socket.js";
import conversationRoutes from "./routes/conversation.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }
});

initSocket(io);

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);

app.use("/api/visuals", visualsRoutes);

app.use("/api/user", userRoutes);

app.use("/api/effects", effectsRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/conversation", conversationRoutes);

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
    server.listen(PORT, () => {
        console.log('Server started on port 3000');
    })
})
