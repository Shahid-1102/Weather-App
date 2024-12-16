# Weather-App

Introduction

The Weather Application is a full-stack project that allows users to view current weather conditions, forecasts, and historical weather data for any city. Users can input a city name, and retrieve accurate weather details using the Open-Meteo API. This project is designed to demonstrate a modern web application using React, Spring Boot, and MongoDB.

Technologies Used

Frontend

- React with Vite for fast development.

- Material-UI for responsive and aesthetic UI components.

- Axios for handling HTTP requests.

Backend

- Spring Boot for REST API development.

- MongoDB for storing weather data.

- Open-Meteo API for fetching weather information.

Prerequisites

Node.js: Ensure Node.js is installed on your system. You can download it from Node.js Official Website.

Java JDK 17 or higher: Required to run the Spring Boot backend.

MongoDB: Ensure MongoDB is installed locally or accessible via a cloud provider.

API Key: You need an API key from OpenWeather API.

Setup Instructions

Step 1: Clone the Repository

  # Clone the repository
    git clone https://github.com/your-username/weather-app.git
  
  # Navigate to the project directory
    cd weather-app

Step 2: Frontend Setup

  Navigate to the frontend directory:

    cd frontend
  
  Install dependencies:
  
    npm install
  
  Start the frontend application:
  
    npm run dev
  
  The application will run locally at http://localhost:5173.

Step 3: Backend Setup

  Navigate to the backend directory:

    cd backend
  
  Install dependencies and build the application:
  
    ./mvnw clean install
  
  Start the Spring Boot server:
  
    ./mvnw spring-boot:run
  
  The backend server will run locally at http://localhost:8080.
  
  Configure MongoDB connection in application.properties:
  
    spring.data.mongodb.uri=mongodb://localhost:27017/weather-app

Step 4: Configure API Key

  Obtain an API key from OpenWeather API.
  
  Add the API key to your backend application:
  
  Open the file WeatherService.java.
  
  Replace YOUR_API_KEY_HERE with your actual API key.

Step 5: Run the Application

  Ensure both the frontend and backend are running.
  
  Open your browser and navigate to http://localhost:5173 to use the application.

Features

- Current weather display for a specific city.

- 7-day weather forecast.

- Historical weather data retrieval using Open-Meteo API.

- Responsive and visually appealing UI.

Contributing

Feel free to fork this repository and contribute via pull requests. For major changes, please open an issue to discuss what you would like to change.



