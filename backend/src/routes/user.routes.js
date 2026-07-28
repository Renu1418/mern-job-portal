import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { getProfile, getResume, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);

userRouter.get("/resume/:id",authMiddleware,authorize("user" , "admin"), getResume);

userRouter.put("/profile",authMiddleware,authorize("user" , "admin"),upload.single("resume"), updateProfile);

export default userRouter;

