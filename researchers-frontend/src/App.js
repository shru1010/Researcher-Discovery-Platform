import './App.css';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';




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
  const [results, setResults] = useState([]);


  const getResults = async () =>{
    let res = await axios.get("https://5000-azure-bobcat-uw3ulwbd.ws-us25.gitpod.io/api/researchers", {withCredentials: true});
    console.log(res.data);
    setResults(res.data);
  }

  function showProfileCard(result, index){
    let image = result.imageURL;

    if(image.indexOf("small_photo") !== -1){
      const leftPart = image.slice(0, image.indexOf("small_photo"));
      const rightPart = image.slice(image.indexOf("&user="));
      image = leftPart + "medium_photo" + rightPart;
      console.log(image);
    }
    

    return (
    <Grid item xs = {2}>
    <Card key={index} sx={{ maxWidth: 200}}>
  <CardMedia
    component="img"
    height="140"
    width="200"
    image={image}
    alt="green iguana"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {result.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
  </Card>
  </Grid>
    );
  }
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
      <Grid container spacing={4} justifyContent="space-evenly" alignItems="center">
      {

results.map((result, index) => {return showProfileCard(result, index)}
)
}
      </Grid>

     
    </div>

    </div>
  );
}

export default App;
