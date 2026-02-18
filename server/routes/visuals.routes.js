import express from "express";
// import {uploadAvatarAsset} from "../controllers/visuals.controller.js";

const router = express.Router();
router.post("/avatar", auth, upload.single("avatar"), uploadAvatarAsset);

export default router;