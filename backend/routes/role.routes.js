const express = require("express");
const router = express.Router();

const {addRole,getRoles,updateRole,deleteRole}= require("../controllers/role.controller")

router.post("/",addRole);
router.get('/',getRoles);
router.put("/:id",updateRole);
router.delete("/:id",deleteRole);

module.exports = router