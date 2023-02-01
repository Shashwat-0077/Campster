const mongoose = require("mongoose");
const Review = require("./review");

const campsterSchema = new mongoose.Schema({
    place: { type: String, required: [true, "Shit man"] },
    price: Number,
    state: String,
    title: String,
    description: String,
    images: [
        {
            url: String,
            filename: String,
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

campsterSchema.post("findOneAndDelete", async function (data) {
    if (data) {
        await Review.deleteMany({
            _id: {
                $in: data.reviews,
            },
        });
    }
});

const Campster = mongoose.model("camp", campsterSchema);

module.exports = Campster;
