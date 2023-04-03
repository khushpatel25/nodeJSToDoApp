const express = require("express");

const {getMyProfile,login, createUser,logout} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post('/new', createUser);

router.post('/login',login);

router.get('/logout',logout)

router.get('/me',isAuthenticated, getMyProfile);

module.exports = router