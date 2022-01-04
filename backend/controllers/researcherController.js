import Researcher from "../models/Researcher.js";
import asyncHandler from "express-async-handler";

//@desc     Get all researchers
//@route    GET /api/researchers
//@access   public
export const getResearchers = asyncHandler(async (req, res) => {
  const data = await Researcher.find();
  res.send(data);
});