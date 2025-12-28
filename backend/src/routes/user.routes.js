import { Router } from "express";

const router = Router();

router.route("/signup").post(signup)
router.route("/login").post(loginUser)
router.route("/profile").get(getProfile)

export default router