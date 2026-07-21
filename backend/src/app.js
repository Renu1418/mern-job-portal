import express from "express";
import authRoutes from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
const app = express();

app.use(express.json());

app.use('/uploads', express.static("uploads"));

//ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)
app.use('/api/company', companyRouter)

export default app;