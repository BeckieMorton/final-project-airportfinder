import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//------Connect to database------//
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Airportfinder";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//-----Check connection is working----//
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

//Define mongoose model based on Airport database
const Airport = mongoose.model("Airport", {
  id: Number,
  ident: String,
  type: String,
  name: String,
  latitude_deg: Number,
  longitude_deg: Number,
  elevation_ft: Number,
  continent: String,
  iso_country: String,
  iso_region: String,
  municipality: String,
  scheduled_service: String,
  gps_code: String,
  iata_code: String,
  local_code: String,
  home_link: String,
  wikipedia_link: String,
  keywords: String,
});

//-------Defines the port the app will run on-----//
const port = process.env.PORT || 8080;
const app = express();

//--------Add middlewares-------//
app.use(cors());
app.use(express.json());

//------------END POINTS----------//

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

//----End point for all airports
app.get("/airports", async (req, res) => {
  const airports = await Airport.find();
  res.json(airports);
});

//---End point for all airports in a country
app.get("/airports/country/:iso_country", async (req, res) => {
  const airportCountry = req.params.iso_country;
  const regex = new RegExp("^" + airportCountry + "$", "i"); // Case-insensitive regex to make sure if user types lowercase it will still match with the database
  Airport.find({ iso_country: { $regex: regex } }).then((iso_country) => {
    if (iso_country) {
      res.json(iso_country);
    } else {
      res.status(404).json({ error: `Country not found` });
    }
  });
});

//----End point for SINGLE result (IATA code)----//

app.get("/airports/iata/:iata_code", async (req, res) => {
  const iataCode = req.params.iata_code.toLowerCase();
  const regex2 = new RegExp("^" + iataCode + "$", "i");
  Airport.findOne({ iata_code: { $regex: regex2 } }).then((iata_code) => {
    if (iata_code) {
      res.json(iata_code);
    } else {
      res.status(404).json({ error: `That IATA code does not exist` });
    }
  });
});

//----End point for name of airport ----//

//PUT HERE//

//----End point for search by city ----//

//NOTE: will probably need to match to municipality as there is no city name to match with

//PUT HERE//

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
