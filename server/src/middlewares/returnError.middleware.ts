import { Response } from "express";

function returnError(
  statusCode: number = 500, // Default to 500 Internal Server Error
  res: Response,
  message: string = "Internal Server Error",
  error?: Error // Optional error object for additional logging
) {
  // Log the error with more details
  console.error(
    `[${new Date().toISOString()}] [Error] ${statusCode}: ${message} ${
      error ? `| Stack: ${error.stack}` : ""
    }`
  );

  // Send the error response
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}

export default returnError;
