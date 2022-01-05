
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
    // let result = await ResearcherDetail.aggregate([
    //     {
    //         "$search": {
    //             "index": "interests",
    //             "text": {
    //                 "query": `${req.query.query}`,
    //                 "path": "interests",
    //                 // "fuzzy": {
    //                 //     "maxEdits": 2,
    //                 //     "prefixLength": 3
    //                 // }
    //             }
    //         },
    //     }
    // ]);
    // console.log(result);
    res.send(results);
});