import './App.css';
import React, { useState, useEffect } from 'react';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Home from './pages/Home';
import { getWeather, getWeatherForecast, getHistoricalWeather } from './services/WeatherService';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = async (searchTerm) => {
    console.log('Searching for city:', searchTerm);
    console.log("RESET");
    setCity(searchTerm);
    setStartDate(null);
    setEndDate(null);
    setHistoricalData([]);
    await fetchWeatherData(searchTerm);
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const fetchWeatherData = async (city) => {
    try {
      console.log("IN APP city:", city);
      
      const weatherResponse = await getWeather(city);
      setWeatherData(weatherResponse);

      const forecastResponse = await getWeatherForecast(city);
      setForecastData(forecastResponse);

      // if (startDate && endDate) {
      //   console.log("IN APP City:", city, "Start Date:", startDate, "End Date:", endDate);
      //   const historicalResponse = await getHistoricalWeather(city, startDate, endDate);
      //   setHistoricalData(historicalResponse);
      // }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  const fetchHistoricalData = async () => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      console.log("Fetching historical data for city:", city, "from", formattedStartDate, "to", formattedEndDate);
      try {
        const historicalResponse = await getHistoricalWeather(city, formattedStartDate, formattedEndDate);
        setHistoricalData(historicalResponse);
      } catch (error) {
        console.error('Error fetching historical weather data:', error);
      }
    } else {
      console.error("Please select both start and end dates.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  return (
    <div className='background'>
      <SearchAppBar onSearch={handleSearch} />
      
      <Home 
        city={city} 
        weatherData={weatherData} 
        forecast={forecastData} 
        historicalWeather={historicalData}
        startDate={startDate} 
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGetHistoricalData={fetchHistoricalData}
        setHistoricalData={setHistoricalData}
        historicalData={historicalData}
      />
    </div>
  );
};

export default App;
