const express =require("express");
const { register, login, auth, logout, getUserDetails, updateProfile, getAllUser, getOneUser, updateUserRole, deleteUser } = require("../controllers/user.controller");
const { registerRules,validator, loginRules, updateProfileRules } = require("../middlewares/validator");
const verifyAuth = require("../middlewares/verifyAuth");
const roleCheck = require("../middlewares/verifyRoles");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router();



router.post("/register",registerRules(),validator,register);
router.post("/login", loginRules(),validator,login);
// router.get('/auth',verifyAuth,auth)
// router.get('logout',logout);
router.get("/me",verifyAuth, getUserDetails);
router.put("/me/update",verifyAuth,updateProfileRules(),updateProfile)

router.get('/admin/users',verifyAuth,roleCheck('admin'),getAllUser)
router.get('/admin/users/:id',verifyAuth,verifyUser,roleCheck('admin'),getOneUser)
router.put('/admin/users/:id',verifyAuth,verifyUser,roleCheck('admin'),updateUserRole)
router.delete('/admin/users/:id',verifyAuth,verifyUser,roleCheck('admin'),deleteUser)





module.exports =router;