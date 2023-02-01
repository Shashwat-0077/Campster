const Review = require("../models/review");

module.exports.isReviewAuthor = async (req, res, next) => {
    const { campId, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do that")
        return res.redirect(`/campground/${id}`);
    }
    next();
}