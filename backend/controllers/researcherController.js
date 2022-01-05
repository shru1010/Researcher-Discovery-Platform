import Researcher from "../models/Researcher.js";
import asyncHandler from "express-async-handler";

//@desc     Get all researchers
//@route    GET /api/researchers
//@access   public
export const getResearchers = asyncHandler(async (req, res) => {
  const data = await Researcher.find();
  res.send(data);
});

//@desc     Get researchers for search query
//@route    GET /api/researchers/search
//@access   public
export const getResearchersForInterest = asyncHandler(async (req, res) => {
  let result = await Researcher.aggregate([
      {
          "$search": {
              "autocomplete": {
                  "query": `${req.query.query}`,
                  "path": "interests",
                  "fuzzy": {
                      "maxEdits": 2,
                      "prefixLength": 3
                  }
              }
          }
      }
  ]).toArray();
  res.send(result);
});