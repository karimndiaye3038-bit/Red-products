const { BrevoClient } = require("@getbrevo/brevo");

console.log("BREVO_API_KEY =", process.env.BREVO_API_KEY);

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

module.exports = brevo;