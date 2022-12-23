import { Router } from "express";
import signinValidation from "../middlewares/signin.middleware.js";

const router = Router();

router.post("/signin", signinValidation);

export default router;
