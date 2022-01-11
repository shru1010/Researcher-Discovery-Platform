import asyncHandler from "express-async-handler";
import ResearcherDetail from "../models/ResearcherDetail.js";
//Serp API code

import SerpApi from "google-search-results-nodejs";
const search = new SerpApi.GoogleSearch(`${process.env.GOOGLE_SCHOLAR_API_KEY}`);
var institutes = [
  //"csir hyderabad",
  //"csir new delhi",
  //"csir bengalure",
  //"csir kolkata",
  //"csir chennai",
  //"csir pune",
  //"csir lucknow"
    // "iit roorkee",
    // "iit kanpur",
    // "iit guwahati",
    // "nit rourkela",
    // "iiit allahabad",
    // "iiit ranchi",
    // "iiit patna",
    // "nit goa",
    // "nit manipur",
    // "nit agartala",
    // "nit raipur",
    // "nit sikkim",
    // "nit andhra pradesh",
    //  "iit tirupati",
    //  "iiit surat",
    //  "iiit lucknow",
    //  "iiit nagpur",
    //  "iiit pune",
    //  "iiit dharwad",
    //  "iit varanasi",
    //  "iiit Tiruchirappalli",
    //  "iit jammu",

//   "iit hyderabad",
//   "iiit bangalore",
//   "nit warangal",
//  "iit bombay",
//   "iiit hyderabad",
//   "nit delhi",
//   "nit karnataka",
//   "nit calicut",
//  "iit delhi",
//   "iiit kota",
//   "NIT Tiruchirappalli",
//  "iit madras",
//   "iit kharagpur"
];

//@desc     Get all researchers from Google Scholar SERP API and store in database
//@route    GET /api/researchers/populate
//@access   public
export const getResearchersFromAPI = asyncHandler(async (req, res) => {
  const params = {
    engine: "google_scholar_profiles",
    mauthors: "",
    hl: "en",
  };
  const authorsPerInstitute = 50;
  const counters = {};
  for (let i = 0; i < institutes.length; i++) {
    counters[institutes[i]] = 0;
  }
  const callback = async function (data) {
    let institute = data["search_parameters"]["mauthors"];
    
    const profiles = data.profiles;
    console.log(profiles);
    const pagination = data.pagination;

    for (let i = 0; i < profiles.length; i++) {
      let interests = [];
      let currProfile = profiles[i];
      if (currProfile.interests != undefined) {
        for (let j = 0; j < currProfile.interests.length; j++) {
          interests.push(currProfile.interests[j].title);
        }
      }
      const researcher = new ResearcherDetail({
        name: currProfile["name"],
        author_id: currProfile["author_id"],
        link: currProfile["link"],
        affiliations: currProfile["affiliations"],
        imageURL: currProfile["thumbnail"],
        email: currProfile["email"],
        interests: interests,
      });
    const prof  = await ResearcherDetail.findOne({author_id: currProfile["author_id"]});
    if(prof == null || prof == undefined)
        await researcher.save();
    }

    counters[institute] += profiles.length;

    if (
      counters[institute] < authorsPerInstitute &&
      pagination["next_page_token"] != undefined
    ) {
      params["mauthors"] = institute;
      params["after_author"] = pagination["next_page_token"];
      search.json(params, callback);
    }
  };

  // Show result as JSON
  let i = 0;
    // for (i = 0; i < institutes.length; i++) {
        params["mauthors"] = "CSIR roorkee";
        params["after_author"] = "";
        search.json(params,  callback);
    // }
  res.send("Done");
});
