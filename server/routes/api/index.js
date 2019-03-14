const express = require("express");
const router = express.Router();
const contactRoute = require("./contact");

router.use("/contact", contactRoute);

module.exports = router;
