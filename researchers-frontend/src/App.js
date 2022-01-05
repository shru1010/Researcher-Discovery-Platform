import "./App.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";

import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";


const CssTextField = styled(TextField)({
  // '& label.Mui-focused': {
  //   color: 'green',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    // '&:hover fieldset': {
    //   borderColor: 'yellow',
    // },
    // '&.Mui-focused fieldset': {
    //   borderColor: 'green',
    // },
  },
});

function App() {
  const [researchArea, setResearchArea] = useState("");
  const [results, setResults] = useState(null);
  
  const startResults = async ()=>{
    let res = await axios.get(
      `https://rdp-website.herokuapp.com/api/researchers`,
      { withCredentials: true }
    );
    console.log(res.data);
    setResults(res.data.slice(0, 10));
  }
  useEffect(() => {
   startResults();
  }, [])



  const getResults = async () => {
    let res = await axios.get(
      `https://rdp-website.herokuapp.com/api/researchers/search?query=${researchArea}`,
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
            <CssTextField
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  getResults();
                }
              }}
              value={researchArea}
              onChange={(e) => setResearchArea(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Enter the Research Area and press ENTER"
              variant="filled"
            />
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
