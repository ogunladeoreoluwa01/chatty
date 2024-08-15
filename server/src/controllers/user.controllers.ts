
import User from "../models/user.model";
import OTP from "../models/oneTimePass.model"
import bycrypt from "bcryptjs";
import {generateRandomCode,generateJwt,getRandomNumber} from "../utils/helperFunctions"
import returnError from "../middlewares/returnError.middleware"
import { Request, Response, NextFunction } from "express";


// interfaces
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}
interface regUser {
  username: string;
  email: string;
  password: string;
}
interface loginUser {
  userinfo: string;
  password: string;
}

interface userRefresh {
  userRefreshToken: string;
}

interface changeUserPassword {
  newPassword: string;
  oldPassword?:string;
  isForgotten:boolean;
  OTPCode?:string;
}


export const getUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const message: string = `No user ID found`;
      return returnError(400, res, message);
    }

    const user = await User.findById(userId).select(
      "-password -oldPasswords -__v"
    );

    if (!user) {
      const message: string = `user not found`;
      return returnError(404, res, message); // Use 404 for not found
    }

    return res.status(200).json({
      message: `${user.username}'s details fetched successfully`,
      user, // Return the user details, except those that were excluded
    });
  } catch (err) {
    next(err);
  }
};
