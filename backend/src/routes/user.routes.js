import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, updateProfilePhoto } from "../controllers/user.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);

userRouter.put("/profile/update",authMiddleware,authorize("student" , "recruiter"), upload.single("file"), updateProfile);
userRouter.put("/profile/photo/update", authMiddleware, authorize("student", "recruiter"),upload.single("file"),updateProfilePhoto);

export default userRouter;

