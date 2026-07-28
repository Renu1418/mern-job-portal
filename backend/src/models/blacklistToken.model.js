import mongoose from "mongoose"


const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true,
        expires:0
    }
},{timestamps: true})

const blacklistModel = mongoose.model("BlacklistToken",blacklistTokenSchema);

export default blacklistModel;