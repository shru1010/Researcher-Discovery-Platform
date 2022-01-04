import mongoose from 'mongoose';

const researcherDetailSchema  = new  mongoose.Schema({
    name: String,
    link: String,
    imageURL: String,
    affiliations: String,
    email: String,
    interests: Array,
});

const ResearcherDetail =  mongoose.model("researcherDetail", researcherDetailSchema);
export default ResearcherDetail;
