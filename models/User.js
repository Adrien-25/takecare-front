import mongoose, { model, Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      default:""
    },
    postalCode: {
      type: String,
      required: true,
      default:""
    },
    streetAddress: {
      type: String,
      required: true,
      default:""
    },
    country: {
      type: String,
      required: true,
      default:""
    },
  },
  {
    timestamps: true,
  }
);
export const User = models.User || model("User", userSchema);
// const User = model("User", userSchema);
