import { Router } from "express";
import { createTweet } from "../controllers/tweet.controller.js";
import isLoggedIn from "../middlewares/authentication.js";

const router = Router();

router.post('/', isLoggedIn, createTweet);

export default router;