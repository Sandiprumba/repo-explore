import express from "express";
import { exploreLanguage } from "../controllers/explore.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticed.js";

const router = express.Router();

router.get("/repos/:language", ensureAuthenticated, exploreLanguage);

export default router;
