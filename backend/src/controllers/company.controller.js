import companyModel from "../models/company.model.js";

// Add company

export const addCompany = async (req,res)=>{
    try {
     const{ companyName } = req.body;
     if(!companyName){
        return res.status(400).json({
            success:false,
            message:"Company name is required"
        });
     }
    
     const isCompany = await companyModel.findOne({companyName})
     if(isCompany){
        return res.status(400).json({
            success:false,
            message: "Company is already registered"
        });
     }

     const company = await companyModel.create({
        companyName,
        userId:req.user.id
     });

     return res.status(201).json({
        success:true,
        message:"Company registered successfully",
        company
     })
    } 
    catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}

// to get all companies created by a userId

export const getcompany = async (req,res)=>{
    
    try {
        const userId =  req.user.id;

        const companies = await companyModel.find({userId});
        if(!companies){
            return res.status(400).json({
                success:false,
                message:"companies not found"
            });
        }
        
        return res.status(200).json({
            success:true,
            companies
        });
    }
    
    catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}


// get company by companyId

export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);

        if(!company){
            return res.status(400).json({
                success:false,
                message:"company not found"
            });
        }

        return res.status(200).json({
            success:true,
            company
        })
    } 
    
    catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}

// update company

export const updateCompany = async (req,res)=>{
    try {
        const{name,description,website,location} = req.body;
        const file = req.file;

        // cloudinary

        const updateData = {};

        const company = await companyModel.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(400).json({
                success:false,
                message:"company not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"company information updated"
        })
    } 
    catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}