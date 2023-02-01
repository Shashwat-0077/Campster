const Campster = require("../models/campsterSchema");

module.exports.getEditPage = async (req, res) => {
    const { id } = req.params;
    let camp = await Campster.findById(id);
    if (!camp) {
        req.flash("error", "Cannot find that campground");
        return res.redirect("/campground");
    }
    res.render("campground/camp-edit", camp);
};

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    const camp = await Campster.findByIdAndUpdate({ _id: id }, req.body.camp);
    let images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    camp.images.push(...images);
    await camp.save();

    req.flash("edited", "Successfully edited the campground");
    res.redirect(`/campground/${id}`);
};

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Campster.findByIdAndDelete(id);
    req.flash("deleted", "Campground deleted");
    res.redirect(`/campground`);
};
