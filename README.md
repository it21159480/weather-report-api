
# Weather Report API

## Introduction

The Weather Report API is a robust system designed to provide automated weather updates via email. It integrates with OpenWeatherMap to fetch real-time weather data and uses a scheduling system to send periodic email notifications. This solution is ideal for users who need regular updates on weather conditions for specific locations.

## Technologies and Tools Used

- **Backend**: Node.js with Express – for building the RESTful API.
- **Database**: MongoDB – for storing user data and weather information.
- **Email Service**: SMTP with Nodemailer – for sending out email updates.
- **APIs**:
  - OpenWeatherMap – for real-time weather data.
  - GeminiAI – for generating descriptive weather texts.

## System Architecture

### Entity Relationship Diagram

The system manages the following key entities:

- **User**: Represents the users of the system who will receive weather updates.
- **Weather Data**: Stores weather information fetched from OpenWeatherMap.
- **Email Schedules**: Manages the scheduling of email dispatches.
- **Logs**: Records activities for auditing and debugging purposes.

## Functional Requirements

1. **User Management**:
   - Secure registration and authentication of users.
   - Users can subscribe/unsubscribe to weather updates.

2. **Weather Data Fetching**:
   - Automated fetching of weather data from OpenWeatherMap.
   - Data is refreshed periodically to ensure up-to-date information.

3. **Email Notification System**:
   - Scheduled emails are sent every three hours with the latest weather update.
   - Customizable email content using OpenAI to generate reader-friendly weather descriptions.

4. **Security and Privacy**:
   - Implementation of robust security measures for data protection.
   - Compliance with privacy laws and regulations.

## Features and Functions

- **User Authentication**: Utilizes JWT for secure access.
- **Dynamic Weather Updates**: Users receive updates based on their specified locations.
- **Custom Email Schedules**: Users can set their preferred times for receiving updates.

## Contribution

To contribute to this project:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## Future Enhancements

- Mobile application integration for real-time push notifications.
- Integration with calendar apps for personal schedule adjustments based on weather.
- Enhanced customization options for users in selecting what weather information they receive.

## Setup and Installation

To set up the project locally:

```bash
git clone <repository URL>
cd weather-report-api
npm install
node index.js
```


## Project Folder Structure

Here's an overview of the main project directories and files:


```
/weather-report-api/
|-- config/
| |-- DB.js 
| |-- setupMailer.js 
|-- controllers/
| |-- userController.js
|-- models/
| |-- users.js
|-- node_modules/
|-- routes/
| |-- userRoute.js 
|-- tasks/
| |-- mailScheduler.js 
|-- utils/
| |-- fetchWeatherData.js 
| |-- weatherDescriptionAI.js
|-- .env
|-- .gitattributes 
|-- index.js 
|-- package-lock.json 
|-- package.json
|-- README.md 
```


This section will give a clear overview of the file structure and the purpose of each file and folder in your repository, making it easier for new contributors to understand the architecture of your application.

## API Documentation  

- The API is documented using Postman. The documentation is available at google drive link: [Postman/collection](https://documenter.getpostman.com/view/27077121/2sA3e4Ap4u) after click in link. 
