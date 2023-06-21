const express = require("express");
const router = express.Router();
const { login, register, getAllUsers, updateUser } = require("../controllers/user.controller");
const upload = require('../utils/multer.setup');
/*******Login-logout******************************* */

router.post("/login", login);

router.post("/register", register);

router.get("/", getAllUsers);

router.put("/:id",  upload.single('file'),updateUser);


module.exports = router