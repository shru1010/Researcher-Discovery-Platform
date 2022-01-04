import express from "express";
import { getResearchers } from "../controllers/researcherController.js";

const router = express.Router();

//Get all researchers route
router.route("/").get(getResearchers);



export default router;