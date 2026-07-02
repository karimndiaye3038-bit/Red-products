const Joi = require("joi");

const hotelSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    pricePerNight: Joi.number().required(),
    currency: Joi.string().required(),
    image: Joi.string().allow("")
});

module.exports = hotelSchema;