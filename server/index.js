import express from 'express';
import connectToDB from "./db/connectToDB.js";
import cors from "cors";

const app = express();
app.use(cors());

const testDB = async () => {
    await connectToDB();
}

testDB();

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
