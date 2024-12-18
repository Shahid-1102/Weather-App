import api from '../api/axiosConfig';

export const getWeather = async (city, unit = 'metric') => {
  try {
    const response = await api.get(`/weather`, { params: { city, unit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getWeatherForecast = async (city, unit = 'metric') => {
  try {
    const response = await api.get(`/weather/forecast`, { params: { city, unit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

export const getHistoricalWeather = async (city, startDate, endDate, unit = 'metric') => {
  try {
    console.log("Fetching historical weather:", { city, startDate, endDate, unit });
    const response = await api.get(`/weather/historical`, {
      params: { city, startDate, endDate, unit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return null;
  }
};