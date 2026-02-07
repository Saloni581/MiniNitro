import express from 'express';
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./db/connectToDB.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

connectToDB().then(() => {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    })
})
