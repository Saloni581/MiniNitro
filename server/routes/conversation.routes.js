import express from 'express';
import { getAllConversations } from "../controllers/conversation.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all-conversations", auth, getAllConversations);

export default router;