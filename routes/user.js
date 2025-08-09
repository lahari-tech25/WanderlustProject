const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
.route("/signup")
.get(userController.renderSignupForm)
.post( wrapAsync(userController.signup));

router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{
    failureFlash: true,
    failureRedirect: "/login"
}), wrapAsync(async (req, res) => {
    await userController.login(req, res);
}))

router.get("/logout",userController.logout);

module.exports = router;