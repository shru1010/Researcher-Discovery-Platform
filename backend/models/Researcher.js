import mongoose from "mongoose";

const researcherSchema = new mongoose.Schema({});

const Researcher = mongoose.model("Researcher", researcherSchema, "Researcher");
export default Researcher;