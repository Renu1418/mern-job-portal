import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/datauri.js";

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
     const file = req.file;

    //4  clourdinary 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


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

    //#5 cloudinary
    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url; //to save cloudinary url
        user.profile.resumeOriginalName = file.originalname; //to save file original name
    }

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

// to update profile

export const updateProfilePhoto = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Profile photo is required"
            });
        }

        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(
            fileUri.content
        );

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.profile.profilePhoto = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile photo updated successfully",
            profilePhoto: user.profile.profilePhoto
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};