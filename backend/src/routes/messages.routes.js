import {Router} from "express";
import multer from "multer";
import { auth } from "../middlewares/auth.middleware.js";
import { getMessages, getUsers } from "../controllers/message.controller.js";

const router = Router()
const uploadNone = multer().none()

router.get("/getUsers", auth, uploadNone,getUsers)
router.get("/getMessages/:id", auth, uploadNone, getMessages);

export default router;