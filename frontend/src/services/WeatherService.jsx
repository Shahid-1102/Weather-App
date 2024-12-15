import axiosConfig from "../api/axiosConfig";

const apiUrl = 'http://localhost:8080/weather';

export const getWeather = async (city, unit = 'metric') => {
  try {
    const response = await axiosConfig.get(`${apiUrl}?city=${city}&unit=${unit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getWeatherForecast = async (city, unit = 'metric') => {
  try {
    const response = await axiosConfig.get(`${apiUrl}/forecast?city=${city}&unit=${unit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

export const getHistoricalWeather = async (city, startDate, endDate, unit = 'metric') => {
  try {
    const response = await axiosConfig.get(`${apiUrl}/historical?city=${city}&startDate=${startDate}&endDate=${endDate}&unit=${unit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return null;
  }
};
