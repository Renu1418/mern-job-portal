import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { applyJob,getAppliedJob,getApplicants,updateStatus } from '../controllers/application.controller.js';


const applicationRouter = express.Router();

applicationRouter.post("/apply/:id",authMiddleware,applyJob)
applicationRouter.get("/get",authMiddleware,getAppliedJob)
applicationRouter.get("/get/:id",authMiddleware,getApplicants)
applicationRouter.post("/status/:id/update",authMiddleware,updateStatus)

export default applicationRouter;