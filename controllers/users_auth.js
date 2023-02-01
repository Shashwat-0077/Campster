const User = require("../models/user")

module.exports.getRegisterPage = (req, res) => {
    res.render("Auth/register");
}

module.exports.getLoginPage = (req, res) => {
    res.render("Auth/login");
}

module.exports.registerNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Successfully Registered");
            res.redirect("/campground");
        });

    } catch (err) {
        if (err.name == "MongoServerError") {
            req.flash("error", `{temp : email should be unique , original : ${err.message}}`)
        } else {
            req.flash("error", err.message);
        }
        res.redirect("/register");
    }
}

module.exports.afterLoggingIn = (req, res) => {
    req.flash("success", "Welcome Back");
    const redirect = req.session.returnTo || '/campground';
    delete req.session.returnTo;
    res.redirect(redirect);
}

module.exports.LoggingOut = (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully");
    res.redirect("/campground");
}