
import ResearcherDetail from "../models/ResearcherDetail.js";
import asyncHandler from "express-async-handler";

//@desc     Get all researchers
//@route    GET /api/researchers
//@access   public

export const getResearchers = asyncHandler(async (req, res) => {
  const data = await ResearcherDetail.find({});
  res.send(data);
});

//@desc     Get researchers for search query
//@route    GET /api/researchers/search
//@access   public

export const getResearchersForInterest = asyncHandler(async (req, res) => {
    let results = await ResearcherDetail.find({$text: { $search: `${req.query.query}`}});
    console.log(results);
    res.send(results);
});