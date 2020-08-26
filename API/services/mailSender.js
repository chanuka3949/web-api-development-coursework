var nodemailer = require("nodemailer");
require("dotenv").config();

function sendMail(recepient, subject, messageBody) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: recepient,
    subject: subject,
    text: messageBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
