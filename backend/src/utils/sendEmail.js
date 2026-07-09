const SibApiV3Sdk = require('sib-api-v3-sdk');

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail({ to, subject, html }) {
  try {
    await apiInstance.sendTransacEmail({
      sender: { email: "tonemail@domaine.com", name: "RED PRODUCT" },
      to: [{ email: to }],
      subject,
      htmlContent: html
    });
    console.log("Email envoyé à", to);
  } catch (error) {
    console.error("Erreur envoi email:", error);
  }
}

module.exports = sendEmail;
