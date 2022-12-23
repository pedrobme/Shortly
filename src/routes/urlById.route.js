import { Router } from "express";
import selectOneUrlById from "../controllers/urlById.controller.js";

const router = Router();

router.get("/urls/:id", selectOneUrlById);

export default router;
