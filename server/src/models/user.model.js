import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: [true, "Email must be required!"] },
    password: { type: String, required: [true, "Password must be required!"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
