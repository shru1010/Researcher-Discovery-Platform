
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

//@desc     Get researchers for search query
//@route    GET /api/researchers/search
//@access   public
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
export const getResearchersForInterest = asyncHandler(async (req, res) => {
  let queryVal = req.query.query;
  queryVal = titleCase(queryVal);
  let results = await ResearcherDetail.find({"interests": {$elemMatch: {$eq: `${queryVal}`}}})
    // let results = await ResearcherDetail.find({$text: { $search: `${req.query.query}`}});
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


    // Amruta's idea
    // let result = await ResearcherDetail.aggregate([
    //       // { "$unwind": "$interests"},
    //       {
    //           "$search": {
    //               "index": "interests",
    //               "autocomplete": {
    //                   "query": `${req.query.query}`,
    //                   "path": "interests",
    //                    "fuzzy": {
    //                       "maxEdits": 2,
    //                        "prefixLength": 3
    //                    }
    //               }
    //           },
    //       },
    //   // {
    //   //    $group: { 
    //   //      _id: "$_id", 
    //   //     name: { $first: "$name" }, 
    //   //     link : {$first: "$link"},
    //   //     affiliations: {$first: "$affiliations"},
    //   //     imageURL: {$first: "$imageURL"},
    //   //     email: {$first: "$email"},
    //   //     interests: { $mergeObjects: "$interests"} 
    //   //    } 
    //   // }, 
    //   // {
    //   //   $sort: { _id }
    //   // }
    //   ]);
    //   console.log(result);

    res.send(results);
});