import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 

// imported routes
import authRoutes from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/uploads', express.static("uploads"));


//ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

export default app;





