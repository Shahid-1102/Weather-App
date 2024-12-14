import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <Card sx={{ maxWidth: 400, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {weather.name}, {weather.sys.country}
        </Typography>
        <Typography variant="h6">Temperature: {weather.main.temp}°C</Typography>
        <Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1">Wind Speed: {weather.wind.speed} m/s</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(weather.dt * 1000).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
