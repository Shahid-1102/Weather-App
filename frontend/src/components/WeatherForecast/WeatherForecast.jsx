import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import './WeatherForecast.css'; // Make sure to import the CSS file
import WeatherCard from '../WeatherCard/WeatherCard';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; // Weather icons


const WeatherForecast = ({ forecast, unit }) => {
  if (!forecast) return <div>Loading...</div>;

  // Helper function to group data by day and find the maximum temperature
  const processForecastData = (forecast) => {
    const dailyMaxTemp = {};

    forecast.forEach((weather) => {
      const date = new Date(weather.timestamp).toISOString().split('T')[0];
      if (!dailyMaxTemp[date] || weather.temperature > dailyMaxTemp[date].temperature) {
        dailyMaxTemp[date] = {
          temperature: weather.temperature,
          description: weather.description,
        };
      }
    });

    // Convert to an array and take the first 7 days
    return Object.entries(dailyMaxTemp).slice(0, 7).map(([date, data]) => ({
      date,
      ...data,
    }));
  };

  const dailyForecast = processForecastData(forecast);

  const getWeatherIcon = (description) => {
      if (description.includes('cloud')) return <WiCloudy size={60} />;
      if (description.includes('rain')) return <WiRain size={60} />;
      if (description.includes('snow')) return <WiSnow size={60} />;
      if (description.includes('storm')) return <WiThunderstorm size={60} />;
      return <WiDaySunny size={60} />;
    };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="weather-forecast">
      <Grid container spacing={2}>
        {dailyForecast.map((weather, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" className="forecast-card">
              <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" className="date">{formatDate(weather.date)}</Typography>
                <Typography variant="body1" className="description">Description: {weather.description}</Typography>
                <Typography variant="body1" className="temperature">Max Temperature: {unit === 'metric' ? weather.temperature + ' °C' : (weather.temperature * 9/5 + 32).toFixed(2) + ' °F'}</Typography>
              </Box>
                <Box className="weather-icon">
                  {getWeatherIcon(weather.description)}
                </Box>
              </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherForecast;
