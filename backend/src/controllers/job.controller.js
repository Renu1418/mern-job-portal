import jobModel from "../models/job.model.js";

export const createJob = async (req,res)=>{

    try {
 
    let{title,description,requirements,salary,location,experience,jobType,position,companyId}=req.body;
    
    if(!title || !description || !requirements || !salary || !location || !experience || !jobType || !position || !companyId ){
       return res.status(400).json({
        success:false,
        message:"All fields are required"
       })
    }

    requirements = requirements.split(",");
    const userId = req.user.id;

    const job = await jobModel.create({
        title,
        description,
        requirements:requirements,
        salary,
        location,
        experience,
        jobType,
        position,
        company: companyId,
        createdBy:userId

    })

    return res.status(201).json({
        success:true,
        message:"New job created successfully",
        job
    })

 } 
  
 catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}
// for users
export const getAllJobs = async (req,res)=>{

    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        // .populate()--- to display company details
        const jobs = await jobModel.find(query).populate({
            path:"company"
        }).sort({ createdAt: -1 });
       
        if(!jobs){
            return res.status(400).json({
                success:false,
                message:"Jobs not found"
            });
        }
         
        return res.status(200).json({
            success:true,
            jobs
        })

    } 
   catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}


export const getJobById = async (req,res)=>{

    try {
        
        const jobId =req.params.id;


        const job = await jobModel.findById(jobId).populate({
            path:"applications"
        });
        
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Jobs not found"
            });
        }
         
        return res.status(200).json({
            success:true,
            job
        })

    } 
   catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}

// for admin
export const getAdminjob = async (req,res)=>{

    try {
        const adminId = req.user.id;

        const jobs = await jobModel.find({createdBy:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        
        if(!jobs){
            return res.status(404).json({
                success:false,
                message:"Jobs not found"
            });
        }
         
        return res.status(200).json({
            success:true,
            jobs
        })

    } 
   catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
}