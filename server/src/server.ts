import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import errorHandler from "./middlewares/errorHandler.middelware";
import Logger from "./lib/logger";
import morganMiddleware from "./config/morganMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db";

// route imports
// import authRoute from './routes/auth.routes';
// import demoRoute from './routes/demo.routes';
// import userRoute from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morganMiddleware);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//error handler 
app.use(errorHandler);

// Connect to DB
connectDB();

// Routes
// app.use("/api/auth", authRoute);
// app.use("/api/private", privateRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  Logger.debug(`Server is up and running @ http://localhost:${PORT}`);
});
