
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import blacklistModel from "../models/blacklistToken.model.js";
import { sendVerificationEmail, forgotpasswordEmail } from "../utils/emailService.js";
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../config/cloudinary.js";



// register user start
const register = async (req, res) => {

    // * register flow - 1 *
    //      -data(name,enail,password,role) from post request
    //      -if user already exist return response
    //      -hash the password
    //      -generate otp
    //      -create data in database
    //      -call sendVerificationEmail function -data will send - name,email,verificationOtp

    try {

        const { name, email, password, role } = req.body;

        // check if user already exists
        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }


        // hash password
        const hashPassword = await bcrypt.hash(password, 10);
        const userRole = role || "student";


        //to generate 6-digit otp
        const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationOtpExpiry = Date.now() + 10 * 60 * 1000;

        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
            role: userRole,
            verificationOtp: verificationOtp,
            verificationOtpExpiry: verificationOtpExpiry,
            isVerified: false
        })


        //  * register flow-2 start*
        //  -we will call sendVerificationEmail() function and will pass data on it -name,email,Option
        //  -now it will  got to sendVerificationEmail() function in emailService.js
        //  -sendVerificationEmail() returns sendEmail() function, and pass data (name,email,otp)
        //  -then sendEmail() function calls otpTemplate() function gets htmlContent then
        //  -now sendEmail() functions pass the data -email,subject,htmlContent 
        //  - and finally Brevo  gets post request and verify all data then send otp to user email


        //to send verification email 
        try {
            await sendVerificationEmail(email, name, verificationOtp);

        }
        catch (error) {
            console.error("failed to send verification email:", error);
        }

        return res.status(201).json({
            success: true,
            message: "Account created successfully! Please check your email for 6-digit verification code",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: false

            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// register user end


//  email verification confirmation through otp start

const VerifyEmail = async (req, res) => {

    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            })
        };

        const user = await userModel.findOne({
            email,
            verificationOtp: otp,
            verificationOtpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or expire OTP"
            })
        }

        //updating that perticular user verified status,otp and expiry and then save the changed data in databse
        user.isVerified = true;
        user.verificationOtp = undefined;
        user.verificationOtpExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully! You can now log in"
        });

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//  email verification confirmation through otp - end




//login user start
const login = async (req, res) => {

    //try 
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email address before logging in"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        //to create token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profile: user.profile
            }

        });


    }

    //catch error
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//login user end


//   forgot password code - start

//if user forgot the password

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User with this email not found"
            });
        }
        const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const resetOTPExpiry = Date.now() + 10 * 60 * 1000 //10min

        user.resetPasswordOtp = resetOTP;
        user.resetPasswordOtpExpiry = resetOTPExpiry;
        await user.save();

        try {
            await forgotpasswordEmail(email, user.name, resetOTP);
        } catch (error) {
            console.error("failed to send reset email:", error);
        }

        return res.status(200).json({
            success: true,
            message: "Reset OTP sent successfully"
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//if user forgot the password

//to reset password - start


const resetPassword = async (req, res) => {

    try {

        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email,OTP and Password is required"
            });
        }

        const user = await userModel.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired otp"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful! now you can log in with new password."
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}



//  to reset password - end


//   forgot password code - start


//   logout user

const logout = async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User already logged out"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const blacklistedToken = await blacklistModel.findOne({ token });

        if (!blacklistedToken) {
            await blacklistModel.create({
                token,
                expiresAt: new Date(decoded.exp * 1000)
            });
        }



        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export default { register, login, VerifyEmail, forgotpassword, resetPassword, logout };

