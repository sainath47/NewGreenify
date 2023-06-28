const mongoose = require('mongoose');

// Define the schema for the CSV data
const readingSchema = new mongoose.Schema({
  srNo: { type: String },
  towerNo: { type: String },
  floor: { type: String },
  flatNo: { type: String },
  meterSerialNoKitchenUnit: { type: String },
  usage: { type: String },
  meterSerialNoToiletUnit: { type: String }
});

// Create the Mongoose model
const readings = mongoose.model('rough', readingSchema);
module.exports = readings;