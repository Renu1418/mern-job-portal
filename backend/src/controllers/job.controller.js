import jobModel from "../models/job.model.js";
import applicationModel from "../models/application.model.js";

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
                {description:{$regex:keyword,$options:"i"}},
                {requirements:{$regex: keyword,$options: "i"}},
                {location:{$regex: keyword,$options: "i" } }                             
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

// update job by Id
// update job by Id

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const recruiterId = req.user.id;

        let {
            title,
            description,
            requirements,
            salary,
            location,
            experience,
            jobType,
            position
        } = req.body;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !experience ||
            !jobType ||
            !position
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const job = await jobModel.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Sirf jis recruiter ne job create ki hai wahi update kar sakta hai
        if (job.createdBy.toString() !== recruiterId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this job"
            });
        }

        requirements = requirements.split(",");

        job.title = title;
        job.description = description;
        job.requirements = requirements;
        job.salary = salary;
        job.location = location;
        job.experience = experience;
        job.jobType = jobType;
        job.position = position;

        await job.save();

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// delete job by Id

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const recruiterId = req.user.id;

        const job = await jobModel.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Sirf jis recruiter ne job create ki hai wahi delete kar sakta hai
        if (job.createdBy.toString() !== recruiterId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job"
            });
        }

        // Delete all applications related to this job
        await applicationModel.deleteMany({
            job: jobId
        });

        // Delete the job
        await jobModel.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "Job and related applications deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};