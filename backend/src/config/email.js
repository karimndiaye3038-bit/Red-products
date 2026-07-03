const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ email, subject, message }) => {

    await transporter.sendMail({

        from: `"RED PRODUCT" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: subject,

        html: `
            <h2>Réinitialisation du mot de passe</h2>

            <p>${message}</p>
        `

    });

};

module.exports = sendEmail;