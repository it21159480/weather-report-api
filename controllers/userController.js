const User = require('../models/users'); // Adjust the path as necessary
const fetchWeatherData = require('../utils/fetchWeatherData');  // Adjust the path as necessary


// Create a new user
async function createUser(req, res) {
    try {
        const {name, email, location } = req.body;
        if (!email || !location || !name) {
            return res.status(400).json({ message: "Name , Email and location are required." });
        }

         // Inline arrow function to generate the user ID
         const generateUserId = (name) => {
            const formattedName = name.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lowercase
            const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
            return `${formattedName}${randomNumber}`;
        };

        // Fetch weather data for the location
        const weatherData = await fetchWeatherData(location);

        // Generate a user ID
        const userId = generateUserId(name);

        // Create a new user with initial weather data
        const newUser = new User({
            id : userId,
            name,
            email,
            location,
            weatherData: [weatherData]  // Add the weather data as an array element
        });


        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Fetch all users from the database
async function getAllUsers(req, res) {
    try {
        
        const users = await User.find({});
        
        // Return the list of users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a user's location
async function updateUserLocation(req, res) {
    try {
        const { id } = req.params;
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({ message: "New location is required." });
        }

        // Fetch new weather data for the updated location
        const weatherData = await fetchWeatherData(location);

        // Find the user and update their location and weather data
        const user = await User.findOneAndUpdate(
            { id: id },
            {
                location: location,
                $push: { weatherData: weatherData }  // Push the new weather data to the array
            },
            { new: true, upsert: true }  // upsert creates the document if it doesn't exist
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user);
    } catch (error) {
        console.error('Failed to update location or fetch weather data:', error);
        res.status(400).json({ message: error.message });
    }
}

// Retrieve weather data for a given day
async function getWeatherByDate(req, res) {
    const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const specificDate = new Date(date);
        specificDate.setHours(0, 0, 0, 0); // Normalize the date for comparison

        const weatherDataForDay = user.weatherData.filter(data => {
            const dataDate = new Date(data.date);
            dataDate.setHours(0, 0, 0, 0);
            return dataDate.getTime() === specificDate.getTime();
        });

        if (weatherDataForDay.length === 0) {
            return res.status(404).json({ message: "No weather data found for this date." });
        }

        res.json(weatherDataForDay);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}







module.exports = {
    createUser,
    getAllUsers,
    updateUserLocation,
    getWeatherByDate
};
