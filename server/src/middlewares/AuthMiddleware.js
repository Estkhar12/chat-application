import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token not found!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(500).json({ message: "User not found!" });
    }
    req.user = currentUser;
    next();
    
  } catch (error) {
    res.status(500).json(error);
  }
};
