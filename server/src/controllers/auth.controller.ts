
import User,{IUser} from "../models/user.model";
import OTP from "../models/oneTimePass.model"
import bycrypt from "bcryptjs";
import {generateRandomCode,generateJwt,getRandomNumber} from "../utils/helperFunctions"
import returnError from "../middlewares/returnError.middleware"
import { Request, Response, NextFunction } from "express";


// interfaces
interface AuthenticatedRequest extends Request {
  user:{
    id:string;
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

export const registerUser = async (req: Request, res: Response,next:NextFunction) => {
  
  try {
    const { username, email, password }: regUser = req.body;

    const [user_name, user_email] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (user_name) {
      let message:string =`oops the name ${username} has already been taken.`
      return returnError(400,res,message) 
    }

    if (user_email) {
       let message: string = ` the selected email  has already been taken.`;
      return returnError(400, res, message); 
    }

    const bannerImage = [
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752752/banners/krtd7r8c3rcnc3sf085y.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752762/banners/rumelxnrqxqw3xqfibjv.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752757/banners/bd4ljls4skpvdqukga1m.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752755/banners/gqwmj7n0vayf7nhjdxfk.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752754/banners/ty6hxccdvsaq5oxgpdc0.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752753/banners/mfryrl6ogrxqj9m5hr5s.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752753/banners/nzj31j3lpn9zf6d4emjr.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752753/banners/nzsyjkdabvrgetufgsjt.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752753/banners/jibp5rfg46cs0vgszyts.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752752/banners/avmn70pzbixfrwxk9ndn.jpg",
    ];

    const profileImage = [
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752756/profiles/kftgxuglthk0bkzcwoxr.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752761/profiles/tkytmwlikk5opl0mdqsp.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752761/profiles/mj56mtoceqwmjp1ijtmj.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752761/profiles/yq2yafktjskh0pxiek2z.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752761/profiles/deyvxq1lbjjocmwxm7k8.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752759/profiles/twpnyrbumjssxcyvnwfl.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752758/profiles/y4zfictsmzfhsk9gpeu7.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752758/profiles/stkxrm0cfjh4kvjaoubg.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752757/profiles/cshxb5nllzlw0wcpcsog.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752757/profiles/jrkypeb7xxnn1dq6ovyv.jpg",
      "https://res.cloudinary.com/dnmwhbb15/image/upload/v1716752756/profiles/mobd90fwxwo533rmadmh.jpg",
    ];


    const randomBannerIndex = getRandomNumber(0,bannerImage.length-1)

    const randomProfileIndex = getRandomNumber(0, profileImage.length - 1);





    // Create new user with random avatar and cover image
    const newUser = new User({
      username,
      email,
      password,
      profile: {
        profileImage: profileImage[randomProfileIndex],
        bannerImage: bannerImage[randomBannerIndex],
      },
    });

    const user = await newUser.save();
    const accessToken = generateJwt(user.id, "15m");
    const refreshToken = generateJwt(user.id, "14d");
    return res.status(201).json({
      message: `✨🎉🌟🚀 Welcome, ${username}! We're thrilled to have you onboard! 🚀🌟🎉✨`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err ) {
   next(err)
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userinfo, password }: loginUser = req.body;

    // Check if the provided credential matches a username or an email
    const user = await User.findOne({
      $or: [{ username: userinfo }, { email: userinfo }],
    });
    if (!user) {
      let message: string = `User with the provided credential does not exist.`;
      return returnError(404, res, message);
    }
    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
         let message: string = `Incorrect password.`;
         return returnError(410, res, message);
      }

    const accessToken = generateJwt(user.id, "15m");
    const refreshToken = generateJwt(user.id, "14d");
    return res.status(200).json({
      message: `welcome back ${user.username} ✨🎉🌟🚀`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshUserAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userRefreshToken }: userRefresh = req.body;

    if (!userRefreshToken) {
      return returnError(401, res, "Refresh token required");
    }



const decoded = jwt.verify(userRefreshToken, process.env.JWT_SECRET);
const user = await User.findById(decoded.id)

if (!user) {
  let message: string = `Invalid refresh token`;
  return returnError(441, res, message);
}

const accessToken = generateJwt(user.id, "15m");
res.status(200).json({ message: `access token refreshed`,accessToken:accessToken });

  } catch (err) {
    next(err);
  }
};

export const changeUserPassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      newPassword,
      oldPassword,
      isForgotten,
      OTPCode,
    }: changeUserPassword = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      const message: string = `Invalid user ID`;
      return returnError(441, res, message);
    }

    if (!isForgotten) {
      // Check if old password matches
      const oldPasswordMatch = await bcrypt.compare(
        oldPassword || "",
        user.password
      );
      if (!oldPasswordMatch) {
        const message: string = `Incorrect old password`;
        return returnError(401, res, message);
      }

      // Check if the new password matches the current password
      const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
      if (newPasswordMatch) {
        const message: string = `Cannot use the same password as before`;
        return returnError(401, res, message);
      }

      // Hash the new password and check if it has been used before
      const hashedNewPassword: string = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT as string)
      );
      const isNewPasswordBeenUsed =
        user.oldPasswords.includes(hashedNewPassword);
      if (isNewPasswordBeenUsed) {
        const message: string = `Cannot use an already used password`;
        return returnError(401, res, message);
      }

      // Save the current password to oldPasswords and update to the new password
      user.oldPasswords.push(user.password);
      user.password = newPassword; 
      await user.save();
    } else {
      const oneTimePass = await OTP.findOne({ userId: userId, otp: OTPCode });
      if (!oneTimePass) {
        const message: string = `Incorrect OTP ❌`;
        return returnError(401, res, message);
      }

      // Check if OTP has expired
      if (new Date() > oneTimePass.expiresAt) {
        await oneTimePass.deleteOne();
        const message: string = `OTP has expired. Please request another. ⏰`;
        return returnError(401, res, message);
      }

      // Hash the new password and check if it has been used before
      const hashedNewPassword: string = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT as string)
      );
      const isNewPasswordBeenUsed =
        user.oldPasswords.includes(hashedNewPassword);
      if (isNewPasswordBeenUsed) {
        const message: string = `Cannot use an already used password`;
        return returnError(401, res, message);
      }

      // Update user password and store the old one
      user.oldPasswords.push(user.password);
      user.password = newPassword; // Assuming pre-save middleware handles hashing

      await user.save(); // Save the updated user

      // Delete the OTP after a successful password change
      await oneTimePass.deleteOne();
    }

    const accessToken = generateJwt(user.id, "15m");
    const refreshToken = generateJwt(user.id, "14d");

    return res.status(200).json({
      message: `${user.username}'s password updated  🔒`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    next(err);
  }
};








