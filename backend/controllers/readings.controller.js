const readingssModel = require("../models/readings.modal");
const xlsx = require("xlsx");
const fs = require("fs");
const userModel = require("../models/user.model");

const getReadingss = async (req, res) => {
  try {
    console.log("testing done");
    const data = await readingssModel.find();
    res.status(200).send({ status: true, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getReadingss };
