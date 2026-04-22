import express from 'express';
import { modifyAvatarEffect, modifyNameplateEffect, modifyProfileEffect } from "../controllers/effects.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/avatar-effects/active", auth, modifyAvatarEffect);

router.patch("/profile-effects/active", auth, modifyProfileEffect);

router.patch("/nameplate-effects/active", auth, modifyNameplateEffect);

export default router;