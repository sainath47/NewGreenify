const express = require("express");
const router = express.Router();
const { getAllReading, uploadReadings } = require("../controllers/reading.controller");
const upload = require('../utils/multer.setup');



router.get("/", getAllReading);
router.post("/", upload.single('file') ,uploadReadings);




module.exports = router
//date format need to changed for frontend