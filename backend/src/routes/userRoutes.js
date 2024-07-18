import { Router } from "express";
import {
  signup,
  login,
  getUsers,
  searchUsers,
  verifyToken,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", auth, getUsers);
router.get("/users/search", auth, searchUsers);
router.get("/verify-token", auth, verifyToken);

export default router;
