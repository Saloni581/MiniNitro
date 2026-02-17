import express from "express";
// import {uploadAvatarAsset} from "../controllers/visuals.controller.js";

const router = express.Router();
router.post("/visuals/avatar", upload.single("avatar"), uploadAvatarAsset);

export default router;