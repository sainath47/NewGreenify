const express = require("express");
const multer = require('multer');
const router = express.Router();
const { getAllReading, uploadReadings } = require("../controllers/reading.controller");

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder to save the uploaded file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    },
  });
const upload = multer({ storage });

router.get("/", getAllReading);
router.post("/", upload.single('file') ,uploadReadings);




module.exports = router
//date format need to changed for frontend