const express = require("express");
const router = express.Router();
const { getReadingss } = require("../controllers/readings.controller");

router.get("/", getReadingss);

module.exports = router;
