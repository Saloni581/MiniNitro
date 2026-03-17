import express from 'express';
import { createUserProfile, getAllUsers, getUserById, getUserData } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import validator from "../middlewares/validator.middleware.js";
import { profileSchema } from "../../validations/profile.schema.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

router.post("/profile", auth, validator(profileSchema), createUserProfile);

router.get("/me", auth, getUserData);

router.get("/:userId", auth, getUserById);


export default router;