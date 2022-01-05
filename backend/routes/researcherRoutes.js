import express from "express";
import { getResearchers, getResearchersForInterest } from "../controllers/researcherController.js";
import { getResearchersFromAPI } from "../controllers/scholarAPIController.js";

const router = express.Router();

//Get all researchers route
router.route("/").get(getResearchers);

// Get researchers based on research area
router.route("/search").get(getResearchersForInterest);

// Populate the database with researchers from Google Scholar API.
router.route("/populate").get(getResearchersFromAPI);

export default router;