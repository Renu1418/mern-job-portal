import userModel from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

//to user data 

export const getProfile = async (req,res)=>{

    try {
        const user = await userModel.findById(req.user.id).select("-password")
       
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"

            })
        }

            return res.status(200).json({
                success:true,
                user
            });

    } 
    catch (err) {
       return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// to update user profile

export const updateProfile = async (req,res)=>{

  try {
     const{name,email,phone,bio,skills}= req.body;

     const skillsArray = skills ? skills.split(",") : [];
     const UserId = req.user.id;
     const user = await userModel.findById(UserId)

     if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        });
     }

     if(!user.profile){
        user.profile = {};
     }

     if(name) user.name = name;
     if(email) user.email = email;
     if(phone) user.phone = phone;
     if(bio) user.profile.bio = bio;
     if(skills) user.profile.skills = skillsArray;

     await user.save();

     res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        role:user.role,
        profile:user.profile
     }

     })

}

 catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }

}