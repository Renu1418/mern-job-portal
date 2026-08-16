import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addCompany,getcompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';
import { upload } from "../middleware/uploadMiddleware.js";
const companyRouter = express.Router();

companyRouter.post("/register",authMiddleware,addCompany)
companyRouter.get("/get",authMiddleware,getcompany)
companyRouter.get("/get/:id",authMiddleware,getCompanyById)
companyRouter.put("/update/:id",authMiddleware,upload.single("file"),updateCompany)

export default companyRouter;