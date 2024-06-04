import express from 'express';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectToDB from './config/dbConnection.js';

config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/ping", () => console.log("server is up and running"));

app.all("*", (req, res) => {
    res.status(404).send("not found");
});

app.listen(PORT, async () => {
    await connectToDB();
    console.log("server is running at Port: " + PORT);
});