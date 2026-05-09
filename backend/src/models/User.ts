import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  email: string;
  phone?: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  otpSecret?: string;
  otpExpiry?: Date;
  lastLogin?: Date;
  reviewsCount: number;
  totalAnalysisTime: number;
  preferredLanguages: string[];
  apiKey: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImage: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    otpSecret: String,
    otpExpiry: Date,
    lastLogin: Date,
    reviewsCount: {
      type: Number,
      default: 0,
    },
    totalAnalysisTime: {
      type: Number,
      default: 0,
    },
    preferredLanguages: {
      type: [String],
      default: ['javascript', 'python'],
    },
    apiKey: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
