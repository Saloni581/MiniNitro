import express from 'express';
import { modifyAvatarEffectInfo } from "../controllers/effects.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/avatar-effects", auth, modifyAvatarEffectInfo);

export default router;