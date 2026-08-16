import express from 'express'

import { createJob, getAllJobs, getJobById, getAdminjob } from '../controllers/job.controller.js';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';

const jobRouter = express.Router();

jobRouter.post('/post', authMiddleware,authorize("recruiter") ,createJob );
jobRouter.get("/get", authMiddleware, getAllJobs);
jobRouter.get("/get/:id", authMiddleware, getJobById);
jobRouter.get("/getadminJobs", authMiddleware, getAdminjob);


export default jobRouter;