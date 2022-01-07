
import ResearcherDetail from "../models/ResearcherDetail.js";
import asyncHandler from "express-async-handler";
import { query } from "express";

//@desc     Get all researchers
//@route    GET /api/researchers
//@access   public

export const getResearchers = asyncHandler(async (req, res) => {
  const data = await ResearcherDetail.find({});
  res.send(data);
});

// To make the first letter of each word a capital letter
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

//@desc     Get researchers for search query
//@route    GET /api/researchers/search
//@access   public
export const getResearchersForInterest = asyncHandler(async (req, res) => {
  let queryVal = req.query.query;
  queryVal = titleCase(queryVal);
  let results = await ResearcherDetail.find({"interests": {$elemMatch: {$eq: `${queryVal}`}}})
    // let results = await ResearcherDetail.find({$text: { $search: `${req.query.query}`}});
    console.log(results);
    res.send(results);
});

//@desc     Get all interests without duplicates
//@route    GET /api/researchers/interests
//@access   public
export const getAllInterests = asyncHandler(async (req, res) => {
  let results = await ResearcherDetail.find({}, {"_id": 0,"interests":1}) 
  let allinterests = []
  results.forEach(el => allinterests = allinterests.concat(el["interests"]));
  let lowercaseInterests = allinterests.map(el => el.toLowerCase());
  let uniqueInterests = lowercaseInterests.filter((v, i, a) => a.indexOf(v) === i);
  res.send(uniqueInterests);
})