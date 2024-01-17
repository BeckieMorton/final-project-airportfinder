import express from "express";
import { AirlineModel } from "../models/AirlineModel";
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
router.get("/airlines", async (req, res) => {
  const airlines = await AirlineModel.find();
  res.json(airlines);
});

//---End point for all airlines in a country
router.get("/airlines/country/:country_code", async (req, res) => {
  const airlineCountry = req.params.country_code;
  const regex = new RegExp("^" + airlineCountry + "$", "i"); // Case-insensitive regex to make sure if user types lowercase it will still match with the database
  AirlineModel.find({ country_code: { $regex: regex } }).then(
    (country_code) => {
      if (country_code) {
        res.json(country_code);
      } else {
        res.status(404).json({ error: `Country not found` });
      }
    }
  );
});

export default router;
