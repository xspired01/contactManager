const express = require("express");
const app = express();

const port = 5000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoute = require("./routes/api");

app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log("Listening intently on port " + port);
});
