import express from 'express';
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/avatar", auth, uploadUserAvatar);

export default router;