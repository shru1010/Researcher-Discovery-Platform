import "./App.css";
import { Button, Grid } from "@mui/material";
import axios from "axios";

import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import SearchField from "./SearchField";
//const uri = "https://rdp-website.herokuapp.com";
// const uri = "http://localhost:5000"
const uri = "https://5000-gold-tuna-jzuo6skh.ws-us25.gitpod.io";


function App() {
  const [researchArea, setResearchArea] = useState("");
  const [results, setResults] = useState(null);
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  
  const startResults = async ()=>{
    let res = await axios.get(
      uri+"/api/researchers",
      { withCredentials: true }
    );
    setResults(res.data.slice(0, 10));
  }
  const getAllInterests = async ()=>{
    let res = await axios.get(uri + "/api/researchers/interests", {withCredentials: true});
    setInterests(res.data);
  }
  useEffect(() => {
   startResults();
   getAllInterests();
  }, [])



  const getResults = async () => {
    if(researchArea.length === 0){
      setError("Please enter something to show the results");
      return;
    }
    setError("");
    let res = await axios.get(
      `${uri}/api/researchers/search?query=${researchArea}`,
      { withCredentials: true }
    );
    console.log(res.data);
    setResults(res.data);
  };

  return (
    <div>
      {/* <Box component="form" noValidate> */}
      <div style={{ margin: "3%" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <SearchField researchInterests={interests} researchArea={researchArea} setResearchArea={setResearchArea} errorMsg={error} setErrorMsg={setError} getResults={getResults}/>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={getResults}
              variant="contained"
              type="submit"
              color="success"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="profiles">
        {(() => {
          // if (results === null) {
          //   return (
          //     <div style={{"textAlign": "center", "marginTop": "10%"}}>
          //       <Typography variant="h2" style={{"color": "orange"}}>
          //         Please enter something to see the results
          //       </Typography>
          //     </div>
          //   );
          // } else {
            if (results != null && results.length === 0) {
              return (
                <div style={{"textAlign": "center", "marginTop": "10%"}}>
                <Typography variant="h2" style={{"color": "orange"}}>
                  No results found....!!
                </Typography>
              </div>
              )
            } else {
              return (
                <Grid
                  container
                  spacing={4}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {results != null && results.map((result) => (
                    <ProfileCard  result={result}/>
                  ))}
                </Grid>
              );
            }
          })()}
      </div>
    </div>
  );
}

export default App;
