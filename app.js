if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //<---------------------layouts in ejs
const session = require("express-session"); //<--------------Help us to make sessions
const flash = require("connect-flash"); //<------------------Flash messages
const passport = require("passport");
const passLocal = require("passport-local");
const User = require("./models/user");

//routers
const campground = require("./routers/campground.js");
const new_camp = require("./routers/new-camp.js");
const camp_edit = require("./routers/camp-edit.js");
const user_auth = require("./routers/users_auth");

//db
mongoose
    .connect(
        "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
    )
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log("ERROR : ", err);
    });

const app = express();

//engine setup (ejs)
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

//providing static files
app.use(express.static(path.join(__dirname, "static")));

//morgan
app.use(morgan("dev"));

//method setup
app.use(methodOverride("_method"));

//req.body setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cookie setup
const session_option = {
    secret: "thisWasSupposedToBeaSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(session_option));

//passport
app.use(passport.initialize()); // <---------------------------|
app.use(passport.session()); // <------------------------------|
passport.use(new passLocal(User.authenticate())); // <---------|---- search for these
//info stored and received from session                        |
passport.serializeUser(User.serializeUser()); // <-------------|
passport.deserializeUser(User.deserializeUser()); // <---------|

//flash messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.deleted = req.flash("deleted");
    res.locals.edited = req.flash("edited");

    res.locals.currentUser = req.user;
    next();
});

//main
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/", user_auth);
app.use("/campground", campground);
app.use("/new-camp", new_camp);
app.use("/camp-edit", camp_edit);

app.all("*", (req, res) => {
    // res.status(404).render("404_page");
    res.status(404).send("<h1>Page not found</h1>");
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(status).render("error", { err });
});

app.listen(80, () => {
    console.log("Meet you at 80");
});
