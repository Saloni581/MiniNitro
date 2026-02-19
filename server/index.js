import express from 'express';
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import visualsRoutes from "./routes/visuals.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);

app.use("/api/visuals", visualsRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

connectToDB().then(() => {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    })
})
