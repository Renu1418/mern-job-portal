import mongoose from "mongoose";

  const companySchema = new mongoose.Schema({
    
    logo:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
   }, {timestamps:true});

  const companyModel = mongoose.model("company",companySchema)

  export default companyModel;