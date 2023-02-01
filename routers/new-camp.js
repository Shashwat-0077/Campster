const express = require("express");
const router = express.Router();
const { validateCamp } = require("../utils/JoiSchema");
const { detectError } = require("../utils/detectError");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { getNewCampForm, registerNewCamp } = require("../controllers/new-camp");
const multer = require("multer")
const { storage } = require("../cloudinary/index")

let upload = multer({ storage })

router.route("/")
    .get(
        isLoggedIn,
        getNewCampForm
    )
    .post(
        isLoggedIn,
        upload.array('images'),
        validateCamp,
        detectError(registerNewCamp),
    );

module.exports = router;
