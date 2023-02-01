const express = require("express");
const router = express.Router();
const passport = require("passport");
const { detectError } = require("../utils/detectError");

const {
    getRegisterPage,
    registerNewUser,
    getLoginPage,
    afterLoggingIn,
    LoggingOut,
} = require("../controllers/users_auth");

router
    .route("/register")
    .get(getRegisterPage)
    .post(detectError(registerNewUser));

router
    .route("/login")
    .get(getLoginPage)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        afterLoggingIn
    );

router.get("/logout", LoggingOut);

module.exports = router;
