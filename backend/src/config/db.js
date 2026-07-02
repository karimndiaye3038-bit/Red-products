const mongoose = require("mongoose");
const dns = require("dns")

dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {

    try{

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connecté");

    }

    catch(err){

        console.log(err);

    }

}

module.exports = connectDB;