import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProfileCard = ({ result }) => {
  const [image, setImage] = useState("");
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    let image = result.imageURL;

    if (image.indexOf("small_photo") !== -1) {
      const leftPart = image.slice(0, image.indexOf("small_photo"));
      const rightPart = image.slice(image.indexOf("&user="));
      image = leftPart + "medium_photo" + rightPart;
      console.log(image);
    }
    setImage(image);
  }, [result]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid key={result._id} item xs={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          style={{ objectFit: "contain" }}
          component="img"
          height="220"
          image={image}
          alt={result.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {result.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Affiliations: </b> {result["affiliations"]}
          </Typography>

          <Collapse in={expanded} timeout="auto">
            <Typography variant="body2" color="text.secondary">
              <b>Research Areas: </b>
              {result.interests.map((interest, i) => (
                <p key={i}>{interest}</p>
              ))}
            </Typography>
          </Collapse>
        </CardContent>
        <CardActions style={{ width: "100%" }}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={10}>
              <Button size="small">
                <a href={result.link}>Google Scholar Link</a>
              </Button>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                //   style={{ float: "right" }}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProfileCard;
