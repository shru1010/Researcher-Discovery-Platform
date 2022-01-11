
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import React from "react";

const CssTextField = styled(TextField)({
 
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
  },
});

// This is the code for the autocomplete search field
export default function SearchField({researchInterests, researchArea, setResearchArea, errorMsg, setErrorMsg, getResults}) {
  // const [researchArea, setResearchArea] = useState("");
  return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(e, value) => setResearchArea(value)}
        value={researchArea}
        options={researchInterests.map((option) => option)}
        renderInput={(params) => <CssTextField {...params}
        helperText={errorMsg}
        error={errorMsg.length !== 0}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            getResults();
          }
        }}
        onChange={(e) => {
          if(e.target.value.length > 0){
            
            setErrorMsg("");
          }
          setResearchArea(e.target.value);
        }}
        fullWidth
        id="outlined-basic"
        label="Enter the Research Area and press ENTER"
        variant="filled"
        />
      }
      />

  );
}
