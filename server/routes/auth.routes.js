import express from 'express';
import { signup, signin, signout } from "../controllers/auth.controller.js";
import validator from "../middlewares/validator.middleware.js";
import { baseAuthSchema, signUpSchema } from "../validations/auth.schema.js";

const router = express.Router();

router.post('/signup', validator(signUpSchema), signup);

router.post('/signin', validator(baseAuthSchema), signin);

router.post('/signout', signout);

export default router;
