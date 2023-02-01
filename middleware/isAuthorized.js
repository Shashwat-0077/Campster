const Campster = require("../models/campsterSchema");

module.exports.isAuthorized = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campster.findById(id);
    if (!camp.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do that")
        return res.redirect(`/campground/${id}`);
    }
    next();
}