import { Router } from "express";
import insertOneUser from "../controllers/signup.controller.js";
import signupValidation from "../middlewares/signup.middleware.js";

const router = Router();

router.post("/signup", signupValidation, insertOneUser);

export default router;
