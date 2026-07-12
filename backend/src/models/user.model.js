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
        required: false
    },
    resume: {
        type: String,
        required: false
    },
    resumePublicId: {
        type: String,
        default: "",
    },
    savedJobs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Job'
    },
    savedInterviewQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'InterviewQuestion'
    },
    savedRoleQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'RoleQuestion'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationOtp: {
        type: String,
        default: ""
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