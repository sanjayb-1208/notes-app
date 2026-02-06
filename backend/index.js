import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDb from './config/connectDB.js';
import authRoutes from "./routes/authRoutes.js";
import notesRoute from "./routes/notesRoutes.js";
import cookieParser from 'cookie-parser';
import userAuth from './middlewares/userAuthMiddleware.js';
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173'];




const app = express();
connectDb();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Crucial for JWT cookies
}));
app.use("/api/auth",authRoutes);
app.use("/api/notes",notesRoute);




app.get("/", (req, res)=>{
    res.send("Home Page");
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));