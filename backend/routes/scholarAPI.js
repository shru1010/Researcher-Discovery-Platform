import express from "express";
const router = express.Router();
import ResearcherDetail from '../models/ResearcherDetail.js';
//Serp API code

import SerpApi  from 'google-search-results-nodejs';
const search = new SerpApi.GoogleSearch("c927d2044b0700ece6e5f39a72cf6bf55b5bf27c5bcb56a223da84ac889ace23");

const institutes = ["iit hyderabad", "iiit bangalore", "nit warangal", "iit bombay", "iiit hyderabad"]
router.get("/", (req, res)=>{
    const params = {
        engine: "google_scholar_profiles",
        mauthors: "",
        hl: "en"
      };
      
      const callback = async function(data) {
        // console.log(data.profiles[0].interests);
        const profiles = data.profiles;
        for(let i = 0; i < 5; i++){
            let interests = [];
            let currProfile = profiles[i];
            if(currProfile.interests != undefined){
                for(let j = 0; j <  currProfile.interests.length; j++){
                    interests.push(currProfile.interests[j].title);
                }
            }
            const researcher = new ResearcherDetail({
                name: currProfile["name"],
                link: currProfile["link"],
                affiliations: currProfile["affiliations"],
                imageURL: currProfile["thumbnail"],
                email: currProfile["email"],
                interests: interests
            });
            console.log(researcher);
            await researcher.save();
        }
      };
      
      // Show result as JSON

      for(let i = 0; i < institutes.length; i++){
          params["mauthors"] = institutes[i];
          search.json(params, callback);
      }
      
      res.send("Done");
});

export default router;