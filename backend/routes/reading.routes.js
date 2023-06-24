const express = require("express");
const router = express.Router();
const {  uploadReadings, getReadings } = require("../controllers/reading.controller");
const upload = require('../utils/multer.setup');



router.get("/", getReadings);
router.post("/", upload.single('file') ,uploadReadings);




module.exports = router
//date format need to changed for frontend
