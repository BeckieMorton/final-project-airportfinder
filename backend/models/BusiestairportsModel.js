import mongoose from "mongoose";

const { Schema } = mongoose;

//----- The Airport model -------//
const busiestairportsSchema = new Schema({
  continent_rank: {
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
  continent_name: {
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
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  Link: {
    type: String,
  },
});

export const BusiestairportsModel = mongoose.model(
  "Busiestairports",
  busiestairportsSchema
);
