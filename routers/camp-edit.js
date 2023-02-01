const express = require('express');
const router = express.Router();
const { validateCamp } = require("../utils/JoiSchema");
const { detectError } = require("../utils/detectError");
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isAuthorized } = require('../middleware/isAuthorized');
const { getEditPage, updateCamp, deleteCamp } = require('../controllers/camp-edit');
const multer = require("multer")
const { storage } = require("../cloudinary/index")

let upload = multer({ storage })

router.route("/:id")
    .get(
        isLoggedIn,
        isAuthorized,
        detectError(getEditPage)
    )
    .put(
        isLoggedIn,
        isAuthorized,
        upload.array('images'),
        validateCamp,
        detectError(updateCamp)
    )
    .delete(
        isLoggedIn,
        isAuthorized,
        detectError(deleteCamp)
    )

module.exports = router;