import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './HistoricalWeather.css';

const HistoricalWeather = ({ historicalWeather, unit }) => {
  if (!historicalWeather) return <div>Loading...</div>;

  return (
    <div className="historical-weather">
      <Grid container spacing={2}>
        {historicalWeather.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="historical-card" variant="outlined">
              <CardContent>
                <Typography className="timestamp" variant="h6">{data.timestamp}</Typography>
                <Typography variant="body1">Description: {data.description}</Typography>
                <Typography className="temperature" variant="body1">Temperature: {unit === 'metric' ? data.temperature + ' °C' : (data.temperature * 9/5 + 32).toFixed(2) + ' °F'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HistoricalWeather;
