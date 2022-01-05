import './App.css';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';



const getResults = async () =>{
  let res = await axios.get("https://5000-scarlet-eel-gdrrwnk9.ws-us25.gitpod.io/api/researchers", {withCredentials: true});
  console.log(res.data);
}

const CssTextField = styled(TextField)({
  // '& label.Mui-focused': {
  //   color: 'green',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
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
  return (
    <div>
      
      {/* <Box component="form" noValidate> */}
      <div style={{"margin": "3%"}}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={10}>
        <CssTextField fullWidth id="outlined-basic" label="Enter the Research Area and press ENTER" variant="filled" />
      
        </Grid>
        <Grid item xs={2}>
        <Button onClick={getResults} variant="contained" type="submit" color="success">Submit</Button>
    </Grid>
    </Grid>
    </div>
    <div className='profiles'>

    </div>

    </div>
  );
}

export default App;
