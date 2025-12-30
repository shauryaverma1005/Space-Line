import { Router } from "express";
import { updateAvatar } from "../controllers/avatar.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/update-avatar').post(auth, upload.single("avatar"), updateAvatar)

export default router;