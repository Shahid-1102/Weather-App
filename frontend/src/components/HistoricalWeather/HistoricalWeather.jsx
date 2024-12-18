import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './HistoricalWeather.css';

const HistoricalWeather = ({ historicalData, unit }) => {
  // if (!historicalData) return <div>Loading...</div>;

  if (!historicalData || !historicalData.hourlyData || !historicalData.hourlyData.time || !historicalData.hourlyData.temperature_2m) {
    console.log("Invalid data:", historicalData);
    return <div className="empty-weather-container">
                <h2>Select a Date Range</h2>
            </div>;
  }

  // const temperatureData = historicalWeather?.hourlyData?.temperature_2m || [];
  // const timeData = historicalWeather?.hourlyData?.time || [];

  const groupByDate = (data) => {
    const grouped = {};
    data.time.forEach((time, index) => {
      const date = time.split('T')[0];
      if (!grouped[date]) {
        grouped[date] = {
          time: [],
          temperatures: [],
        };
      }
      grouped[date].time.push(time);
      grouped[date].temperatures.push(parseFloat(data.temperature_2m[index]));
    });
    return grouped;
  };

  const groupedData = groupByDate(historicalData.hourlyData);

  return (
    <div className="historical-weather">
      <Grid container spacing={2}>
        {Object.keys(groupedData).map((date, index) => {
          const { temperatures } = groupedData[date];
          const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="historical-card" variant="outlined">
                <CardContent>
                  <Typography className="timestamp" variant="h6">
                    {new Date(date).toLocaleDateString()}
                  </Typography>
                  {/* <Typography variant="body1">Description: {historicalData.description}</Typography> */}
                  <Typography className="temperature" variant="body1">
                    Average Temperature: {unit === 'metric' ? averageTemperature.toFixed(2) + ' °C' : ((averageTemperature * 9/5) + 32).toFixed(2) + ' °F'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default HistoricalWeather;
