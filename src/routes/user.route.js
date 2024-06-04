import { Router } from "express";
import { login, reqisterUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', reqisterUser);
router.post('/login', login);


export default router;