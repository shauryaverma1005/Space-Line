import {Router} from "express";
import multer from "multer";
import { auth } from "../middlewares/auth.middleware.js";
import { getMessages, getUsers } from "../controllers/message.controller.js";

const router = Router()
const uploadNone = multer().none()

router.post("/getUsers", auth, uploadNone,getUsers)
router.post("/getMessages", auth, uploadNone, getMessages);

export default router;