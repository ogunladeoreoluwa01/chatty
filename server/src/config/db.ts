import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!); // Default options are sufficient
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Optional: exit the process if connection fails
  }
};

export default connectDB;