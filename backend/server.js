import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

import airportRoutes from "./routes/airportRoutes";
import airlineRoutes from "./routes/airlineRoutes";
import busiestairportsRoutes from "./routes/busiestairportsRoutes";

//------Connect to database------//
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Airportfinder";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//-----Check connection is working----//
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

//----Defines port app will run on-----//
const port = process.env.PORT || 8080;
const app = express();

//--------Add middlewares-------//
app.use(cors());
app.use(express.json());

//------------Routes----------//

app.use("/", airportRoutes);
app.use("/", airlineRoutes);
app.use("/", busiestairportsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
