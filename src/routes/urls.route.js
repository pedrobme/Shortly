import { Router } from "express";
import {
  insertOneUrl,
  selectOneUrlById,
} from "../controllers/urls.controllers.js";
import { shortenUrlValidation } from "../middlewares/urls.middleware.js";

const router = Router();

router.post("/urls/shorten", shortenUrlValidation, insertOneUrl);

router.get("/urls/:id", selectOneUrlById);

router.get("/urls/open/:shortUrl");

export default router;
