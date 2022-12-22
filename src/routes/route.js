import { Router } from "express";
import signupTest from "../controllers/controller.js";

const router = Router();

router.post("/signup", signupTest);

export default router;
