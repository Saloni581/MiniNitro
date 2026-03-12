import express from 'express';
import { auth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { removeUserAvatar, uploadUserAvatar } from "../controllers/visuals.controller.js";

const router = express.Router();

router.post("/upload-avatar", auth, upload.single("avatar"), uploadUserAvatar);

router.delete("/remove-avatar", auth, removeUserAvatar);

export default router;