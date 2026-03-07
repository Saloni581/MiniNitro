import express from 'express';
import { getAllMessages } from "../controllers/message.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:userId", auth, getAllMessages);

export default router;