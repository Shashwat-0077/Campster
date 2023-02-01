const mongoose = require("mongoose");
const passLocalMongo = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email should be unique"],
    }
})

userSchema.plugin(passLocalMongo);

module.exports = mongoose.model("User", userSchema);