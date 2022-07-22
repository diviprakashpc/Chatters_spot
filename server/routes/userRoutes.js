const express = require("express");
const { registerUser,authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser); //effective url is '/api/user/'
router.post("/login", authUser); //effective url is '/api/user/login'


//The registerUser and authUser is replacing (req,res) callback. These are called controllers that perform logic.

module.exports = router;
