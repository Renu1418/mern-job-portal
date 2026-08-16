import jwt from "jsonwebtoken"
import blacklistModel from "../models/blacklistToken.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
       console.log("COOKIE HEADER:", req.headers.cookie);
        const token = req.cookies.token;
        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                success:false,
                message: "No token found"
            });
        }

        const blacklistedToken = await blacklistModel.findOne({token});
        if(blacklistedToken){
            return res.status(401).json({
                success:false,
                message: "Token has been blacklisted"
            })
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid or Expired token"
        });
     
    }
};

//to authorize

export const authorize = (...roles) => {
    return (req, res, next) => {

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You don't have permission",
            });
        }

        next();
    }
};