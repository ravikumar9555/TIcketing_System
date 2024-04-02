const { createUser, getUserById, getallUser, login, getUserRole, logout, getUserByUserName } = require("../Controller/UserController");

const express = require('express');
const router = express.Router();



// Route to create a new user
router.post('/users', createUser);
router.get("/user/:username",getUserByUserName);
router.get("/users/:userid", getUserById);
router.get("/users/all",getallUser)
router.post("/login/",login)
router.post("/logout",logout)
// router.get("/user/role",getUserRole)

module.exports = router;
