const User = require("../models/User");
const Hotel = require("../models/Hotel");

exports.getKPIs = async (req, res) => {
    try {

        const users = await User.countDocuments();
        const hotels = await Hotel.countDocuments();

        res.status(200).json({
            users,
            hotels,
            messages: 40,
            emails: 25,
            entities: 2,
            forms: 125
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};