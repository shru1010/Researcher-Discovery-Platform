
import ResearcherDetail from "../models/ResearcherDetail.js";
import asyncHandler from "express-async-handler";
//@desc     Get all researchers
//@route    GET /api/researchers
//@access   public

export const getResearchers = asyncHandler(async (req, res) => {
  const data = await ResearcherDetail.find({});
  res.send(data);
});

//@desc     Get researchers for research interest in search query
//@route    GET /api/researchers/search
//@access   public
export const getResearchersForInterest = asyncHandler(async (req, res) => {
  let queryVal = req.query.query;
  let results = await ResearcherDetail.find({"interests": {$elemMatch: {$regex: `${queryVal}`, $options: 'i' }}});
  res.send(results);
});

//@desc     Get all interests without duplicates
//@route    GET /api/researchers/interests
//@access   public
export const getAllInterests = asyncHandler(async (req, res) => {
  let results = await ResearcherDetail.find({}, {"_id": 0,"interests":1}) 
  let allinterests = []
  results.forEach(el => allinterests = allinterests.concat( el["interests"].map( el => el.toLowerCase() ) ));
  let uniqueInterests = allinterests.filter((v, i, a) => a.indexOf(v) === i);
  res.send(uniqueInterests);
})