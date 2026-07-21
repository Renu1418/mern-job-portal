import companyModel from "../models/company.model.js";




// to get company
 export const getCompanies = async (req,res)=>{

    try {
        const companies = await companyModel.find();

        return res.status(200).json({
            success:true,
            companies
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
  }


  //to add company (admin)
 export const addCompany = async (req,res) =>{
    
    try {
        const {website}= req.body;

        if(!website){
            return res.status(400).json({
                success:false,
                message:"website is required"
            })
        }
        const logoUrl = "";
        if(req.file){
            const uploadResult = await uploadToCloudinary(req.file.buffer,"jobportal/logos","image",req.file.originalname)
            logoUrl = uploadResult.secure_url
        }
        
        const company = await companyModel.create({
            logo:logoUrl,
            website,
            createdBy:req.user.id
        })

        return res.status(201).json({
            success:true,
            message:"company created successfully",
            company
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
  }


  //delete the company 

  export const deleteCompany = async (req,res)=>{

    try {
        const company = await companyModel.findById(req.params.id)

        if(!company){
            return res.status(404).json({
                success:false,
                message:"company not found"
            })
        }

        await company.deleteOne();

        return res.status(200).json({
            success:true,
            message:"company deleted successfully"
    })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
  }