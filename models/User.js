import mongoose, { model, Schema, models } from "mongoose";


const userSchema = new Schema(
  {
    fullName: {
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
  },
  {
    timestamps: true,
  }
);
export const User = models.User || model('User', userSchema);
// const User = model("User", userSchema);

// module.exports = User;

