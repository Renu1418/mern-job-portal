import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { applyJob,getAppliedJob,getApplicants,updateStatus } from '../controllers/application.controller.js';


const applicationRouter = express.Router();

applicationRouter.post("/apply/:id",authMiddleware,applyJob)
applicationRouter.get("/get",authMiddleware,getAppliedJob)
applicationRouter.get("/:id/applicants",authMiddleware,getApplicants)
applicationRouter.put("/status/:id/update",authMiddleware,updateStatus)

export default applicationRouter;