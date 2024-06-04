import { Router } from "express";
import { getUserTimeline, login, reqisterUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', reqisterUser);
router.post('/login', login);
router.get('/:userId/timeline', getUserTimeline);


export default router;