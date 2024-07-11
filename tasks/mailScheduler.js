const cron = require('node-cron');
const transporter = require('../config/setupMailer'); // Adjust the path as necessary
const User = require('../models/users'); // Adjust the path as necessary
const fetchWeatherData = require('../utils/fetchWeatherData'); // Assuming fetchWeatherData is moved to utils
// If you exported it as a default export
const generateWeatherDescription = require('../utils/weatherDeiscriptionAI');

const scheduleWeatherUpdates = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('Running a task every 1 hours');
       

        const users = await User.find({});
        users.forEach(async (user) => {
            const weatherData = await fetchWeatherData(user.location);
            const description = await generateWeatherDescription(weatherData);
            const mailOptions = {
                from: {
                    name: 'Weather Report',
                    address: process.env.EMAIL_USER
                },
                to: user.email,
                subject: 'Your Weather Update',
                text: `Hello User\n\nHere is your latest weather update for ${user.location}:\n\n${description}\n\nStay weather-aware,\nWeather Report Team`
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    });
};

module.exports = scheduleWeatherUpdates;
