import applicationModel from "../models/application.model.js";
import jobModel from "../models/job.model.js";

export const applyJob = async (req, res) => {

    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job Id is required"
            });
        }

        const isApplication = await applicationModel.findOne({ applicant: userId, job: jobId });

        if (isApplication) {
            return res.status(400).json({
                success: false,
                message: "Already applied for this Job"
            });
        }

        const job = await jobModel.findById(jobId);

        if (!job) {
            return res.status(400).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot apply for your own job."
            });
        }

        const newApplication = await applicationModel.create({
            job: jobId,
            applicant: userId
        });


        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            success: true,
            message: "Job applied successfully"
        })

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const getAppliedJob = async (req, res) => {

    try {
        const userId = req.user.id;

        const application = await applicationModel.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "No Applications found"
            })
        }

        return res.status(200).json({
            success: true,
            application
        })

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// admin - get applicant applied for particular job Id

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!job) {
            return res.status(400).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            job
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// to update application status - pending,accepted,rejected

export const updateStatus = async (req, res) => {

    try {
        const status = req.body.status;

        const applicationId = req.params.id;
        if (!status) {
            return res.status(404).json({
                success: false,
                message: "Status is required"
            });
        }

        const application = await applicationModel.findById(applicationId).populate("job");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this application."
            });
        }

        // update status 
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
