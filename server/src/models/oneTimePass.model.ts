import mongoose, { Document, Schema } from 'mongoose';

interface IOTP extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' }, // Automatically delete after 1 minutes
  expiresAt: { type: Date, required: true }
});

OTPSchema.pre('save', function (next) {
  this.expiresAt = new Date(this.createdAt.getTime() + 30 * 60000); // Set expiry time 30 minutes from creation
  next();
});

const OTP = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP ;
