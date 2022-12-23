import { Router } from "express";
import { selectUserUrls } from "../controllers/urls.controllers.js";

const router = Router();

router.get("/users/me", selectUserUrls);

export default router;
