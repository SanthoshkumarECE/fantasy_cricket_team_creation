const express = require("express");
const router = express.Router();
const playercontroller = require("../controller/playercontroller")

router.get("/team", playercontroller.sendDetails)
router.post("/", playercontroller.handleValidation)
router.get("/playing11", playercontroller.fetchUpdatedsquad)
router.get("/getplayer",playercontroller.getList) 

module.exports = router; 