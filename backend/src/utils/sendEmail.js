const brevo = require("../config/email");

async function sendEmail({ to, subject, html }) {

    try {

        const result = await brevo.transactionalEmails.sendTransacEmail({

            sender: {
                name: "RED PRODUCT",
                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: to
                }
            ],

            subject,

            htmlContent: html

        });

        console.log("Email envoyé :", result);

    } catch (error) {

        console.error("Erreur Brevo :", error);

        throw error;

    }

}

module.exports = sendEmail;