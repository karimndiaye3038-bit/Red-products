const brevo = require("../config/email");

const sendEmail = async ({ to, subject, html }) => {

    try {

        await brevo.transactionalEmails.sendTransacEmail({

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

        console.log("Email envoyé avec succès");

    } catch (error) {

        console.error("Erreur Brevo :", error);

        throw error;

    }

};

module.exports = sendEmail;