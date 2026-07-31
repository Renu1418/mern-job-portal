import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addCompany,getcompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';

const companyRouter = express.Router();

companyRouter.post("/register",authMiddleware,addCompany)
companyRouter.get("/get",authMiddleware,getcompany)
companyRouter.get("/get/:id",authMiddleware,getCompanyById)
companyRouter.put("/update/:id",authMiddleware,updateCompany)

export default companyRouter;