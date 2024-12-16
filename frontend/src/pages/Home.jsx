import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import HistoricalWeather from '../components/HistoricalWeather/HistoricalWeather';
import DatePicker from '../components/DatePicker/DatePicker';
import './Home.css';

const Home = ({ city, weatherData, forecast, historicalWeather }) => {
  const [unit, setUnit] = useState('metric');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const startDateISO = new Date(startDate).toISOString();
const endDateISO = new Date(endDate).toISOString();
  const url = `http://localhost:8080/weather/historical?city=${city}&startDate=${startDateISO}&endDate=${endDateISO}`;


  const fetchHistoricalData = async (city, startDate, endDate) => {
    try {
        const startDateISO = new Date(startDate).toISOString();
        const endDateISO = new Date(endDate).toISOString();
        const response = await fetch(`http://localhost:8080/weather/historical?city=${city}&startDate=${startDateISO}&endDate=${endDateISO}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHistoricalData(data);
    } catch (error) {
        console.error("Error fetching historical weather data:", error);
    }
  };
  


  const handleGetHistoricalData = (startDate, endDate) => {
    if (!startDate || !endDate || !city) {
      console.error("Missing data: city, startDate, or endDate");
      return;
    }
    console.log(`Fetching historical data for ${city} from ${startDate} to ${endDate}`);

    fetchHistoricalData(city, startDate, endDate)
    .then((data) => {
      console.log("Fetched Historical Data:", data);
    })
    .catch((error) => console.error("Error fetching historical data:", error));
  };

  

  return (
    <Container className="home-container">
      <Grid container spacing={2}>
        {/* Date Picker Section */}
        <Grid item xs={12}>
          <DatePicker
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onGetHistoricalData={handleGetHistoricalData}
          />
        </Grid>

        {/* Current Weather Section */}
        <Grid item xs={12}>
          <WeatherCard weather={weatherData} unit={unit} setUnit={setUnit} />
        </Grid>

        {/* Weather Forecast Section */}
        <Grid item xs={12}>
          <WeatherForecast forecast={forecast} unit={unit} />
        </Grid>

        {/* Historical Weather Section */}
        <Grid item xs={12}>
          <HistoricalWeather historicalWeather={historicalWeather} unit={unit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
