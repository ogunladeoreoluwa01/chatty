import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the user interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  oldPassword: string[];
  isAdmin: boolean;
  superAdmin: boolean;
  profile: {
    gender: string;
    fullName: string;
    bio: string;
    profileImage: string;
    bannerImage: string;
    friends: mongoose.Types.ObjectId[];
  };
  achievements: mongoose.Types.ObjectId[];
  ban: {
    isBaned: Boolean;
    banedReason: String; 
    banedDate:  Date; 
    banedEndDate:  Date; 
  };
  disabled: {
    isDisabled: Boolean; 
    disabledReason: String; 
    disabledDate:  Date;
  };

}

// Define the user schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    oldPassword: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
    profile: {
      gender: { type: String, default: "male" ,enum:["male","female"] },
      fullName: { type: String, default: "" },
      bio: { type: String, default: "" },
      profileImage: { type: String, default: "" },
      bannerImage: { type: String, default: "" },
      friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    },
    achievements: [{type: Schema.Types.ObjectId, ref: "Achievement", default: []}],
    ban:{
    isBaned: { type: Boolean, default: false },
    banedReason: { type: String, default: "" },
    banedDate: { type: Date, default: Date.now },
    banedEndDate: { type: Date, default: Date.now },
    },
    disabled: {
    isDisabled: { type: Boolean, default: false },
    disabledReason: { type: String, default: "" },
    disabledDate: { type: Date, default: Date.now },
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      // Define salt rounds as a number
      const hashedPassword: string = await bcrypt.hash(
        this.password,
        parseInt(process.env.SALT as string)
      );
      this.password = hashedPassword;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

// Model
const User = mongoose.model<IUser>("User", userSchema);


export default User;
