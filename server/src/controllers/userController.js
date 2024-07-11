import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    res
      .status(200)
      .json({ messge: "User Registered Successfully!", data: saveUser });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Email or password is wrong!" });
    }
    const user = await User.findOne({ email });
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Email or password is wrong!" });
    }
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ message: "User LogedIn", data: user, accessToken: token });
  } catch (error) {
    res.status(500).json(error);
  }
};
