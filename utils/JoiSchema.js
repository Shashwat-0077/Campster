const Joi = require("joi");
const ExpressError = require("./ExpressError");

const validateCamp = Joi.object({
    place: Joi.string().required(),
    price: Joi.number().required().min(0),
    state: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
    }),
});

const validateReview = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        ratings: Joi.number().required().min(1).max(5),
    }).required()
})

module.exports.validateCamp = (req, res, next) => {
    let { error } = validateCamp.validate(req.body.camp);
    if (error) {
        let msg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = validateReview.validate(req.body);

    if (error) {
        let msg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}