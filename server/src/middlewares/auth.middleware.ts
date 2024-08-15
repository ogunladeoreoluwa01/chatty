import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const authGuard = async (
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

      // Verify token and decode the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // Find the user by ID, but only need to get the ID here
      const user = await User.findById(decoded.id).select(
        "-password -oldPasswords -__v"
      );

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach only the user ID to the request
      req.user = { id: user.id };

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Token verification failed" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
