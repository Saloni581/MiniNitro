import express from 'express';
import { modifyAvatarEffect } from "../controllers/effects.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/avatar-effects", auth, modifyAvatarEffect);

export default router;