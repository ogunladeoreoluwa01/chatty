
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {generateRandomCode,generateJwt,getRandomNumber} from "../utils/helperFunctions"
import returnError from "../middlewares/returnError.middleware"
import { Request, Response, NextFunction } from "express";


// interfaces
interface regUser {
  username: string;
  email: string;
  password: string;
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

    // Assuming userResponse is a function or method that formats the user data for response

    const accessToken = generateJwt(user.id, "15m");
    const refreshToken = generateJwt(user.id, "14d");

    return res.status(201).json({
      message: `welcome ${username}`,
      accessToken: accessToken,
      refreshToken:refreshToken,
    });
  } catch (err ) {
   next(err)
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { userInfo, password } = req.body;

//     // Check if the provided credential matches a username or an email
//     const user = await User.findOne({
//       $or: [{ username: userInfo }, { email: userInfo }],
//     }).select("-notifications ");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User with the provided credential does not exist." });
//     }

//     // Check if password matches
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(410).json({ message: "Incorrect password" });
//     }

//     // If password matches, generate JWT token
//     const accessToken = generateJwt(user._id, "14d");
//     const refreshToken = generateJwt(user._id, "14d");

//     const userResponse = await User.findById(user._id)
//       .populate({
//         path: "pets.currentDeck",
//         populate: {
//           path: "petInfo",
//           select: "-baseHealth -baseAttack -baseDefense -baseManaCost",
//         },
//       })
//       .populate({
//         path: "pets.favPet",
//         populate: {
//           path: "petInfo",
//           select: "-baseHealth -baseAttack -baseDefense -baseManaCost",
//         },
//       });

//     delete userResponse.password;
//     delete userResponse.oldPassword;
//     delete userResponse.notifications;
//     delete userResponse.__v;

//     // Respond with user data and token
//     res.status(200).json({
//       message: "User logged in successfully.",
//       user: userResponse,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     console.error("Error during user login:", error); // Log the error details
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };
// const refreshToken = async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ message: "Refresh token required" });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select(
//       "-password -oldPassword -notifications -__v"
//     );

//     if (!user) {
//       return res.status(441).json({ message: "Invalid refresh token" });
//     }

//     const accessToken = generateJwt(user._id, "15m");
//     res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error("Error refreshing token:", error);

//     if (error.name === "TokenExpiredError") {
//       res.status(403).json({ message: "Refresh token expired" });
//     } else {
//       res.status(403).json({ message: "Invalid refresh token" });
//     }
//   }
// };

// const createOtpCode = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const otpCode = generateRandomCode();
//     console.log(otpCode);
//     const user = await User.findById(userId);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User with the provided credential does not exist." });
//     }

//     const expiring = Date.now() + 3600000; // 1 hour in milliseconds

//     const otp = new OTP({
//       user: userId,
//       otpCode: otpCode,
//       expiringAt: new Date(expiring),
//     });

//     await otp.save();

//     let email = user.email;
//     let subject = `Verification Token for ${user.username}`;
//     let text = `Your verification code is: ${otpCode}`;
//     let html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Email Verification</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f5f5f5;
//           margin: 0;
//           padding: 0;
//         }
//         .container {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//           background-color: #fff;
//           border-radius: 10px;


//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         h1, h2 {
//           color: #333;
//         }
//         p {
//           color: #666;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//        <h1>placeholder</h1>
//         <h1>Your Verification Code</h1>
//       <p>Dear ${user.username},</p>
//       <p>Your verification code is <strong> ${otpCode} <strong/>. it will last one hour (1)!</p>
//       <p>Best regards,</p>
//       <p>placeholder</p>
//       </div>
//     </body>
//     </html>
//     `;

//     await mailer(email, subject, text, html);

//     res.status(200).json({
//       message: "OTP sent to your email.",
//     });
//   } catch (error) {
//     console.error("Error generating OTP code:", error);
//     error.statusCode = 500;
//     next(error);
//   }
// };

export default  {
  registerUser,
  loginUser,
  refreshToken,
  createOtpCode,
};
