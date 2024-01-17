import mongoose from "mongoose";

const { Schema } = mongoose;

//----- The Airport model -------//
const airlineSchema = new Schema({
  Airline_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  iata: {
    type: String,
    unique: true,
  },
  icao: {
    type: String,
  },
  callsign: {
    type: String,
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
  country: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 2;
      },
      message: "Continent must be exactly 2 characters long.",
    },
  },
  Link: {
    type: String,
  },
});

export const AirlineModel = mongoose.model("Airline", airlineSchema);
