// errorHandler.ts
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error (you can customize the log format)
  console.error(`[Error] ${err.message}`);

  // Customize the response based on the error status or type
  const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
  const errorMessage = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Include stack trace only in development
  });
}

export default errorHandler;
