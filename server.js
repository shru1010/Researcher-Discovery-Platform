
import dotenv from "dotenv";
dotenv.config('./.env');
import express from "express";
import connectDB from "./config/db.js";
import researcherRouter from "./routes/researcherRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";


connectDB();

const app = express();

//Body Parser
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
console.log("API key is " + process.env.DB_URI);
app.use("/api/researchers", researcherRouter);

app.get("/", (req, res)=>{
  res.send("Welcome to the RDP");
})
//If the request doesn't match any uri here, then it goes to notFound and gets 404 not found message passed to errorHandler
app.use(notFound);
//Error handler handles errors and passes a json error message isntead of a html page
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running at port ${PORT}`);
});