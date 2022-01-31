const express =require("express");
const { register, login, auth } = require("../controllers/user.controller");
const { registerRules,validator, loginRules } = require("../middlewares/validator");
const verifyAuth = require("../middlewares/verifyAuth");
const router = express.Router();



router.post("/register",registerRules(),validator,register);
router.post("/login", loginRules(),validator,login);
router.get('/auth',verifyAuth,auth)






module.exports =router;