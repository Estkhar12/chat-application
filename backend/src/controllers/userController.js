import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    res.status(201).send({ message: "User created!" });
  } catch (error) {
    res.status(400).send(error);
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
    res.send({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const users = await User.find(
      { username: new RegExp(searchTerm, "i") },
      "-password"
    );
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyToken = async (req, res) => {
  res.send({ user: req.user });
};
