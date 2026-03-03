import express from 'express';
import { createUserProfile, getUserData } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import validator from "../middlewares/validator.middleware.js";
import { profileSchema } from "../../validations/profile.schema.js";

const router = express.Router();

router.post("/profile", auth, validator(profileSchema), createUserProfile);

router.get("/me", auth, getUserData);

export default router;