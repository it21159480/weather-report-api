const express = require('express');
const connectDB = require('./config/DB'); // Import the DB connection
const userRoutes = require('./routes/userRoute');
require('dotenv').config(); // to use environment variables from .env file
const scheduleWeatherUpdates = require('./tasks/mailScheduler');





connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})
// Use routes
app.use('/users', userRoutes);  // Mount the user routes at '/users'

scheduleWeatherUpdates(); // Initialize the scheduled tasks



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
