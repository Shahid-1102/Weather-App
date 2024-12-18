import React, { useEffect, useState } from 'react';
import { Grid, Container, Divider } from '@mui/material';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import HistoricalWeather from '../components/HistoricalWeather/HistoricalWeather';
import DatePicker from '../components/DatePicker/DatePicker';
import './Home.css';

const Home = ({ city, weatherData, forecast, historicalData, startDate, endDate, onStartDateChange, onEndDateChange, onGetHistoricalData, setHistoricalData }) => {
  const [unit, setUnit] = useState('metric');
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [historicalData, setHistoricalData] = useState(null);
  const [showHistoricalData, setShowHistoricalData] = useState(false);

  useEffect(() => {
    if (city) {
      const timer = setTimeout(() => {
        setShowHistoricalData(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowHistoricalData(false);
    }
  }, [city]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchHistoricalData = async (city, startDate, endDate) => {

    const formattedStartDate = formatDate(new Date(startDate));
    const formattedEndDate = formatDate(new Date(endDate));

    console.log("Fetching with formatted dates:", formattedStartDate, formattedEndDate);
    try {const response = await fetch(`http://localhost:8080/weather/historical?city=${city}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data?.hourlyData) {
          data.hourlyData = JSON.parse(data.hourlyData);
        }

        setHistoricalData(data);
        console.log("Fetched Historical Data:", data);
    } catch (error) {
        console.error("Error fetching historical weather data:", error);
    }
  };
  


  const handleGetHistoricalData = async (city, startDate, endDate) => {
    console.log("City:", city, "Start Date:", startDate, "End Date:", endDate);
    if (!startDate || !endDate || !city) {
      console.error("Missing data: city, startDate, or endDate");
      return;
    }
    console.log(`Fetching historical data for ${city} from ${startDate} to ${endDate}`);

    try {
      await fetchHistoricalData(city, startDate, endDate);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  

  return (
    <Container className="home-container">
      <Grid container spacing={2}>
        

        {/* Current Weather Section */}
        <Grid item xs={12}>
          <WeatherCard weather={weatherData} unit={unit} setUnit={setUnit} />
        </Grid>

        {/* Weather Forecast Section */}
        <Grid item xs={12}>
          <WeatherForecast forecast={forecast} unit={unit} />
        </Grid>


        {/* Date Picker Section */}
        {city && showHistoricalData && (
          <>
          {/* Divider Line */}
        <Grid item xs={12}>
              <Divider className="bold-divider" sx={{ margin: '20px 0' }} />
        </Grid>
        
        <Grid item xs={12}>
        <DatePicker
          // startDate={startDate}
          // setStartDate={setStartDate}
          // endDate={endDate}
          // setEndDate={setEndDate}
          // onStartDateChange={setStartDate}
          // onEndDateChange={setEndDate}
          // onGetHistoricalData={(startDate, endDate) => handleGetHistoricalData(city, startDate, endDate)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onGetHistoricalData={onGetHistoricalData}
        />

        </Grid>

        {/* Historical Weather Section */}
        <Grid item xs={12}>
          <HistoricalWeather historicalData={historicalData} unit={unit} />
        </Grid>
        </>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
