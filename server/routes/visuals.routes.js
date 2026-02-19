import express from 'express';
import { auth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { uploadUserAvatar } from "../controllers/visuals.controller.js";

const router = express.Router();

router.post("/avatar", auth, upload.single("avatar"), uploadUserAvatar);

export default router;