import express from "express"
import authController from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register',authController.register)
router.post('/verify-email',authController.VerifyEmail)
router.post('/resend-otp', authController.resendOtp);
router.post('/login',authController.login)
router.post('/logout',authMiddleware,authController.logout);
router.post('/forgot-password',authController.forgotpassword)
router.post('/reset-password',authController.resetPassword)

export default router;