import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface AuthenticatedRequest extends Request {
  user?: any; 
}

const authGuard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // Verify the token and cast the payload to an object containing id
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // Find the user by id, excluding sensitive fields
      req.user = await User.findById(decoded.id).select(
        "-password -oldPassword -notifications -__v"
      );

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default authGuard;
