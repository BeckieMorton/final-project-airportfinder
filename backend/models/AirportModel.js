import mongoose from "mongoose";

const { Schema } = mongoose;

//----- The Airport model -------//
const airportSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  ident: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  latitude_deg: {
    type: Number,
    required: true,
  },
  longitude_deg: {
    type: Number,
    required: true,
  },
  elevation_ft: {
    type: Number,
    required: true,
  },
  continent: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 2;
      },
      message: "Continent must be exactly 2 characters long.",
    },
  },
  iso_country: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 2; // or adjust as needed
      },
      message: "Country code must be exactly 2 characters long.",
    },
  },
  iso_region: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
  },
  scheduled_service: {
    type: String,
  },
  gps_code: {
    type: String,
  },
  iata_code: {
    type: String,
    required: true,
    unique: true,
  },
  local_code: {
    type: String,
  },
  home_link: {
    type: String,
  },
  wikipedia_link: {
    type: String,
  },
  keywords: {
    type: String,
  },
});

export const AirportModel = mongoose.model("Airport", airportSchema);
