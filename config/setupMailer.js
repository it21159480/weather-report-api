const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS
    }
});

module.exports = transporter;
