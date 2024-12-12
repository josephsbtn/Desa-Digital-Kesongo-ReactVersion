const mongoose = require("mongoose");
const { configDotenv } = require("dotenv");
configDotenv();

var mongoURL = process.env.MONGO_URL;
mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connection Successful");
  })
  .catch((err) => {
    console.error("Mongo DB connection Failed:", err);
  });

module.exports = mongoose;
