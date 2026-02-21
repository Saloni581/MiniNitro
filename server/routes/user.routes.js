import express from 'express';
import { createUserProfile, getUserData } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", auth, createUserProfile);

router.get("/me", auth, getUserData);

export default router;