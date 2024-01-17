import express from "express";
import { BusiestairportsModel } from "../models/BusiestairportsModel";
const router = express.Router();
const listEndpoints = require("express-list-endpoints");
const asyncHandler = require("express-async-handler");

// For ES6 syntax it says to use d of:
// import asyncHandler from "express-async-handler";
// instead of
// const asyncHandler = require("express-async-handler");
//but i dont want to break anything so ill keep as is

//List endpoints to display for render URL
router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//----End point for all airports
router.get("/busiestairports", async (req, res) => {
  const busiestairports = await BusiestairportsModel.find();
  res.json(busiestairports);
});

//---End point for all airlines in a continent
router.get("/busiestairports/continent/:continent", async (req, res) => {
  const busyairlinesContinent = req.params.continent;
  const regex = new RegExp("^" + busyairlinesContinent + "$", "i"); // Case-insensitive regex to make sure if user types lowercase it will still match with the database
  BusiestairportsModel.find({ continent: { $regex: regex } }).then(
    (continent) => {
      if (continent) {
        res.json(continent);
      } else {
        res.status(404).json({ error: `Continent not found` });
      }
    }
  );
});

export default router;
