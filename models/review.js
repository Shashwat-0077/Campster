const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    body: String,
    ratings: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("Review", reviewSchema);
