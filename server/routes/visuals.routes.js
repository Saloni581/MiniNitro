import express from 'express';
import { auth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
    removeTheme,
    removeUserAvatar,
    updateDisplayNameStyle,
    updateTheme,
    uploadUserAvatar
} from "../controllers/visuals.controller.js";

const router = express.Router();

router.post("/upload-avatar", auth, upload.single("avatar"), uploadUserAvatar);

router.delete("/remove-avatar", auth, removeUserAvatar);

router.patch("/theme", auth, updateTheme);

router.patch("/remove-theme", auth, removeTheme);

router.patch("/display-name-style", auth, updateDisplayNameStyle)

export default router;