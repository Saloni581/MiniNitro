import express from 'express';
import { createUserProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", auth, createUserProfile);

export default router;