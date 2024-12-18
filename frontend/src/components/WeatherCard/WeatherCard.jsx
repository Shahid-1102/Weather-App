import React, { useState } from 'react';
import './WeatherCard.css';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; // Weather icons

const WeatherCard = ({ weather, unit, setUnit }) => {
  if (!weather) return (
    <div className="empty-weather-container">
      <h2>Please Select a City</h2>
    </div>
  );

  const convertTemperature = (temp, unit) => {
    if (unit === 'metric') {
      return temp.toFixed(2); // Celsius
    }
    if (unit === 'imperial') {
      return ((temp) * 9/5 + 32).toFixed(2); // Convert from Kelvin to Fahrenheit
    }
    return temp.toFixed(2); // Default to Celsius
  };

  const convertWindSpeed = (windSpeed, unit) => {
    if (unit === 'metric') {
      return windSpeed.toFixed(2); // meters per second (m/s)
    }
    if (unit === 'imperial') {
      return (windSpeed * 2.23694).toFixed(2); // Convert from m/s to miles per hour (mph)
    }
    return windSpeed.toFixed(2); // Default to meters per second
  };

  // Convert weather data based on the selected unit
  const temperature = convertTemperature(weather.temperature, unit);
  const feelsLike = convertTemperature(weather.feelsLike, unit);
  const windSpeed = convertWindSpeed(weather.windSpeed, unit);

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  // Determine the appropriate icon based on the weather description
  const getWeatherIcon = (description) => {
    if (description.includes('cloud')) return <WiCloudy size={150} />;
    if (description.includes('rain')) return <WiRain size={150} />;
    if (description.includes('snow')) return <WiSnow size={150} />;
    if (description.includes('storm')) return <WiThunderstorm size={150} />;
    return <WiDaySunny size={150} />;
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const capitalizeCityName = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  return (
    <Card variant="outlined" className="weather-card" sx={{ position: 'relative' }} >
      <CardContent>
        {/* Header Box with Toggle Button */}
        <Box display="flex" justifyContent="flex-end" alignItems="center" position="absolute" top={20} right={20} mb={2}>
          <Button variant="outlined" onClick={toggleUnit} size="small">
            {unit === 'metric' ? '°F' : '°C'}
          </Button>
        </Box>

        {/* Content Box for Weather Icon and Data */}
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* Weather Details */}
          <Box>
          <Typography variant="h6" className="title">
            {capitalizeCityName(weather.cityName)}
          </Typography>
            <div className="details">
              <Typography variant="body1">Description: {weather.description}</Typography>
              <Typography variant="body1">
                Temperature: {temperature} {temperatureUnit}
              </Typography>
              <Typography variant="body1">
                Feels Like: {feelsLike} {temperatureUnit}
              </Typography>
              <Typography variant="body1">Humidity: {weather.humidity}%</Typography>
              <Typography variant="body1">
                Wind Speed: {windSpeed} {windSpeedUnit}
              </Typography>
              <Typography variant="body1">Pressure: {weather.pressure} hPa</Typography>
            </div>
          </Box>
          <Box className="weather-icon" ml={12}>
            {getWeatherIcon(weather.description)}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
