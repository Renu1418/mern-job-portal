import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
  
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
        
    },

    phone: {
        type: String,
        default: ""
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:"String"},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company'
        },
        profilePhoto:{
          type:String,
          default:""
        }
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationOtp: {
        type: String,
    },

    verificationOtpExpiry: {
        type: Date,
    },
    resetPasswordOtp: {
        type: String,
    },
    resetPasswordOtpExpiry: {
        type: Date,
    }

        
},{timestamps: true});

const userModel = mongoose.model('User', userSchema);

export default userModel;