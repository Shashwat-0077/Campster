const Review = require("../models/review.js");
const Campster = require("../models/campsterSchema");

module.exports.showAllCamps = async (req, res) => {
    let camps = await Campster.find();
    res.render("campground/index", { camps });
}

module.exports.getDetails = async (req, res) => {
    const { id } = req.params;
    let camp = await Campster
        .findById(id)
        .populate({
            path: "reviews",
            populate: { //<-----------------inherited populate
                path: 'author',
            }
        })
        .populate("author");
    if (!camp) {
        req.flash("error", "Cannot find that campground");
        return res.redirect("/campground");
    }
    res.render("campground/details", { camp });
}

module.exports.newReview = async (req, res) => {
    let { id } = req.params;
    let camp = await Campster.findById(id);
    let review = new Review(req.body.review);
    review.author = req.user;

    await camp.reviews.push(review);
    await camp.save();
    await review.save();
    req.flash("success", "Successfully made a new review");
    res.redirect(`/campground/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { campId, reviewId } = req.params;
    await Campster.findByIdAndUpdate(campId, { $pull: { reviews: reviewId } }); // it pulls out the review from the camp
    await Review.findByIdAndDelete(reviewId);
    req.flash("deleted", "Successfully deleted a review");
    res.redirect(`/campground/${campId}`);
}
