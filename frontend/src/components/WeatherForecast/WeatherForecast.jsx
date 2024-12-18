import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './WeatherForecast.css'; // Make sure to import the CSS file
import WeatherCard from '../WeatherCard/WeatherCard';


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
                <Typography variant="h6" className="date">{formatDate(weather.date)}</Typography>
                <Typography variant="body1" className="description">Description: {weather.description}</Typography>
                <Typography variant="body1" className="temperature">Max Temperature: {unit === 'metric' ? weather.temperature + ' °C' : (weather.temperature * 9/5 + 32).toFixed(2) + ' °F'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherForecast;
