import { Router } from "express";
import multer from "multer";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();
const uploadNone = multer().none(); // parse multipart/form-data fields

// Accept both JSON and multipart/form-data (form submissions)
router.post("/signup", uploadNone, signup);
router.post("/login", uploadNone, login);
router.post("/logout", auth, logout);

export default router;
