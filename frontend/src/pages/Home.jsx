import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import HistoricalWeather from '../components/HistoricalWeather/HistoricalWeather';
import './Home.css';

const Home = ({ city, weatherData, forecast, historicalWeather, startDate, endDate }) => {
  
  const [unit, setUnit] = useState('metric');
  
  useEffect(() => {

    if (startDate && endDate && city) {
      // Fetch historical data when dates or city change
    }
  }, [startDate, endDate, city]);

  if (!weatherData || !forecast || !historicalWeather) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="home-container"> {/* Applied the home-container class */}
      <Grid container spacing={2}>
        {/* Current weather */}
        <Grid item xs={12} className="weather-card-container"> {/* Applied the weather-card-container class */}
          <WeatherCard weather={weatherData} unit={unit} setUnit={setUnit} />
        </Grid>

        {/* Weather forecast */}
        <Grid item xs={12} className="forecast-container"> {/* Applied the forecast-container class */}
          <WeatherForecast forecast={forecast} unit={unit} />
        </Grid>

        {/* Historical weather */}
        <Grid item xs={12} className="historical-weather-container"> {/* Applied the historical-weather-container class */}
          <HistoricalWeather historicalWeather={historicalWeather} unit={unit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
