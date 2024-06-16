import { Router } from "express";
import { getUserTimeline, login, reqisterUser } from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/authentication.js";

const router = Router();

router.post('/register', reqisterUser);
router.post('/login', login);
router.get('/:userId/timeline', isLoggedIn, getUserTimeline);


export default router;