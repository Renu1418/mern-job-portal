import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 

// imported routes
import authRoutes from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// fromtemd-backend cors configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://mern-job-portal-frontend-piwr.onrender.com"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/uploads', express.static("uploads"));


//ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)
app.use('/api/company', companyRouter)
app.use('/api/job',jobRouter)
app.use('/api/application', applicationRouter)

export default app;





