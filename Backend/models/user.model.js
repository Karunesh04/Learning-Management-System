import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
      id: String,
      status: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});

userSchema.methods = {
  comparePassword: async function (plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (error) {
      throw new Error("Password comparison failed");
    }
  },
  generateJWTToken: function () {
    try {
      return jwt.sign(
        {
          id: this._id,
          role: this.role,
          email: this.email,
          subscription: this.subscription,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );
    } catch (error) {
      throw new Error("Token generation failed");
    }
  },
  generatePasswordToken: function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    return resetToken;
  }
};

const User = model("User", userSchema);

export default User;
