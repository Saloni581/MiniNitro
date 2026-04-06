import express from 'express';
import { auth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
    removeUserAvatar,
    updateBannerColor,
    updateDisplayNameStyle,
    updateTheme,
    uploadAsset,
} from "../controllers/visuals.controller.js";

const router = express.Router();

router.post("/asset", auth, upload.single("asset"), uploadAsset);

router.delete("/avatar", auth, removeUserAvatar);

router.patch("/theme", auth, updateTheme);

router.patch("/display-name-style", auth, updateDisplayNameStyle);

router.patch("/banner-color", auth, updateBannerColor);

export default router;