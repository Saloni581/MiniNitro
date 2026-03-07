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

const app = express();
const server = http.createServer(app);
const io = new Server(server);

initSocket(io);

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);

app.use("/api/visuals", visualsRoutes);

app.use("/api/user", userRoutes);

app.use("/api/effects", effectsRoutes);

app.use("/api/messages", messageRoutes);

connectToDB().then(() => {
    server.listen(3000, () => {
        console.log('Server started on port 3000');
    })
})
