const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const readingSchema = new Schema(
  {
    READING: {
      type: Number,
      required: true,
    },
    READING_DATE: {
      type: String,
      required: true,
    },
    HOUSE_NO: {
      type: String,
      required: true,
    },
    BLOCK_NO: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reading", readingSchema);
