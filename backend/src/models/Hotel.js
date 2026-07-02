const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    pricePerNight: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "FCFA"
    },

    image: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Hotel", hotelSchema);