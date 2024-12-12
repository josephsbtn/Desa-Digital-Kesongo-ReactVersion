const express = require("express");
const app = express();
const cors = require("cors");
const dbConfig = require("./db");

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started using nodemon on port ${port}`)
);
