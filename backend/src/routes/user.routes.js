import { Router } from "express";
import { signup, login, logout, updateAvatar } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(auth ,logout)
router.route("/avatar").patch(auth, updateAvatar)

export default router