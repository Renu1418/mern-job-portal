import companyModel from "../models/company.model.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import jobModel from "../models/job.model.js";
import applicationModel from "../models/application.model.js";

// Add company
export const addCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            });
        }

        const isCompany = await companyModel.findOne({ companyName })
        if (isCompany) {
            return res.status(400).json({
                success: false,
                message: "Company is already registered"
            });
        }

        const company = await companyModel.create({
            name: companyName,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// to get all companies created by a userId

export const getcompany = async (req, res) => {

    try {
        const userId = req.user.id;

        const companies = await companyModel.find({ userId });
        if (!companies) {
            return res.status(400).json({
                success: false,
                message: "companies not found"
            });
        }

        return res.status(200).json({
            success: true,
            companies
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// get company by companyId

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "company not found"
            });
        }

        return res.status(200).json({
            success: true,
            company
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// update company

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        console.log(name, description, website, location)
        const file = req.file;

        // cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const updateData = { name, description, website, location, logo };

        const company = await companyModel.findByIdAndUpdate(req.params.id, updateData, { returnDocument: "after" });

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "company not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "company information updated"
        })
    }
    catch (error) {
        console.log("UPDATE COMPANY ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// delete company
export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const userId = req.user.id;

        // Find company
        const company = await companyModel.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Check ownership
        if (company.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this company"
            });
        }

        // Find all jobs related to this company
        const jobs = await jobModel.find({
            company: companyId
        });

        const jobIds = jobs.map((job) => job._id);

        // Delete all applications related to those jobs
        if (jobIds.length > 0) {
            await applicationModel.deleteMany({
                job: { $in: jobIds }
            });

            // Delete all jobs related to company
            await jobModel.deleteMany({
                company: companyId
            });
        }

        // Finally delete company
        await companyModel.findByIdAndDelete(companyId);

        return res.status(200).json({
            success: true,
            message: "Company and all related jobs deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};