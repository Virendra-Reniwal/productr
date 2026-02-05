const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: process.env.SENDINBLUE_SENDER_NAME,
      email: process.env.SENDINBLUE_SENDER_EMAIL,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

module.exports = sendEmail;
