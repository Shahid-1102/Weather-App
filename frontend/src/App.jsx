import React, { useState } from 'react';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import axios from 'axios';
import WeatherCard from './components/WeatherCard/WeatherCard';

const App = () => {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
