const Campster = require("../models/campsterSchema");
const mapbox = require("@mapbox/mapbox-sdk/services/geocoding")
const mapbox_token = process.env.MAPBOX_TOKEN
const geocoder = mapbox({ accessToken: mapbox_token })

module.exports.getNewCampForm = (req, res) => {
    res.render("campground/new-camp");
}

module.exports.registerNewCamp = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: `${req.body.camp.place}, India`,
        limit: 1
    }).send()

    let camp = new Campster(req.body.camp);
    camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.geometry = geoData.body.features[0].geometry;
    camp.author = req.user._id;
    await camp.save();
    req.flash("success", "Successfully made a new campground");
    res.redirect(`/campground/${camp._id}`);
}