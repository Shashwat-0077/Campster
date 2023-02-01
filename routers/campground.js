const express = require("express");
const router = express.Router();
const { validateReview } = require("../utils/JoiSchema");
const { detectError } = require("../utils/detectError");
const { isLoggedIn } = require("../middleware/isLoggedIn.js");
const { isReviewAuthor } = require("../middleware/isReviewAuthor.js");
const { showAllCamps, getDetails, newReview, deleteReview } = require("../controllers/campgrounds");

router.get(
    "/",
    detectError(showAllCamps)
);

router.get(
    "/:id",
    detectError(getDetails)
);

router.post(
    "/:id/new-review",
    isLoggedIn,
    validateReview,
    detectError(newReview)
);

router.delete(
    "/:campId/delete-review/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    detectError(deleteReview)
);

module.exports = router;
