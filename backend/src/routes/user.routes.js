import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);

userRouter.put("/profile/update",authMiddleware,authorize("user" , "admin"), updateProfile);

export default userRouter;

