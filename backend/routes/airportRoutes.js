import express from "express";
import { AirportModel } from "../models/AirportModel";
const router = express.Router();
const listEndpoints = require("express-list-endpoints");
const asyncHandler = require("express-async-handler");

//List endpoints to display for render URL
router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//----End point for all airports
router.get("/airports", async (req, res) => {
  const airports = await AirportModel.find();
  res.json(airports);
});

//---End point for all airports in a country
router.get("/airports/country/:iso_country", async (req, res) => {
  const airportCountry = req.params.iso_country;
  const regex = new RegExp("^" + airportCountry + "$", "i"); // Case-insensitive regex to make sure if user types lowercase it will still match with the database
  AirportModel.find({ iso_country: { $regex: regex } }).then((iso_country) => {
    if (iso_country) {
      res.json(iso_country);
    } else {
      res.status(404).json({ error: `Country not found` });
    }
  });
});

//----End point for SINGLE result (IATA code)----//
router.get("/airports/iata/:iata_code", async (req, res) => {
  const iataCode = req.params.iata_code.toLowerCase();
  const regex2 = new RegExp("^" + iataCode + "$", "i");
  AirportModel.findOne({ iata_code: { $regex: regex2 } }).then((iata_code) => {
    if (iata_code) {
      res.json(iata_code);
    } else {
      res.status(404).json({ error: `That IATA code does not exist` });
    }
  });
});

export default router;
