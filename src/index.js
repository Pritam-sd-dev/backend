import express from 'express';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectToDB from './config/dbConnection.js';
import userRouter from './routes/user.route.js'

config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/ping', () => console.log("server is up and running"));

app.use('/api/v1/users', userRouter);

app.all("*", (req, res) => {
    res.status(404).send("not found");
});

app.listen(PORT, async () => {
    await connectToDB();
    console.log("server is running at Port: " + PORT);
});