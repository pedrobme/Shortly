import { Router } from "express";
import insertOneUrl from "../controllers/shorten.controller.js";
import shortenUrlValidation from "../middlewares/shorten.middleware.js";

const router = Router();

router.post("/urls/shorten", shortenUrlValidation, insertOneUrl);

export default router;
