import React, { useState, useEffect } from 'react';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Home from './pages/Home';
import DatePicker from './components/DatePicker/DatePicker';
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
    setCity(searchTerm);
    await fetchWeatherData(searchTerm);  // No need to pass unit anymore
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const fetchWeatherData = async (city) => {
    try {
      const weatherResponse = await getWeather(city);  // Default to Celsius
      setWeatherData(weatherResponse);

      const forecastResponse = await getWeatherForecast(city);  // Default to Celsius
      setForecastData(forecastResponse);

      if (startDate && endDate) {
        const historicalResponse = await getHistoricalWeather(city, startDate, endDate);  // Default to Celsius
        setHistoricalData(historicalResponse);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Use effect to refetch weather data when the city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]); // Trigger when city changes

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} />
      <DatePicker 
        onStartDateChange={handleStartDateChange} 
        onEndDateChange={handleEndDateChange} 
      />
      
      <Home 
        city={city} 
        weatherData={weatherData} 
        forecast={forecastData} 
        historicalWeather={historicalData}
        startDate={startDate} 
        endDate={endDate}
      />
    </div>
  );
};

export default App;
