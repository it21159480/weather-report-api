const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    name:{ type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    description: { type: String },
    windSpeed: { type: Number }
});


const userSchema = new mongoose.Schema({
    id :  { type: String, required: true },
    name :  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    weatherData: [weatherDataSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
