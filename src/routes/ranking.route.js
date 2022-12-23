import { Router } from "express";
import { getVisitCountRaking } from "../controllers/ranking.controller.js";

const router = Router();

router.get("/ranking", getVisitCountRaking);

export default router;
