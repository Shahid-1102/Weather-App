package com.shahid.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shahid.backend.model.WeatherData;
import com.shahid.backend.repo.WeatherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    private static final long CACHE_VALIDITY_DURATION = 30L;

    @Autowired
    public WeatherRepo weatherRepo;

    @Autowired
    private RestTemplate restTemplate;


//CURRENT WEATHER

    public WeatherData getWeather(String city, String unit) {
        Optional<WeatherData> cachedWeather = weatherRepo.findByCityName(city);

        if (cachedWeather.isPresent()) {
            WeatherData weather = cachedWeather.get();

            if (weather.getTimestamp().isAfter(LocalDateTime.now().minusMinutes(CACHE_VALIDITY_DURATION))) {
                return weather;
            }
        }

        WeatherData weather = fetchWeatherFromApi(city, unit);

        if (weather != null) {
            weather.setTimestamp(LocalDateTime.now());
            weatherRepo.save(weather);
        }

        return weather;
    }

    private WeatherData fetchWeatherFromApi(String city, String unit) {
        String url = String.format("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=%s", city, apiKey, unit);

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String jsonResponse = response.getBody();

            if (jsonResponse != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(jsonResponse);

                String cityName = rootNode.path("name").asText();
                String description = rootNode.path("weather").get(0).path("description").asText();
                double temperature = rootNode.path("main").path("temp").asDouble();
                double feelsLike = rootNode.path("main").path("feels_like").asDouble();
                int humidity = rootNode.path("main").path("humidity").asInt();
                double windSpeed = rootNode.path("wind").path("speed").asDouble();
                int pressure = rootNode.path("main").path("pressure").asInt();

                return new WeatherData(
                        null,
                        cityName,
                        description,
                        temperature,
                        feelsLike,
                        humidity,
                        windSpeed,
                        pressure,
                        LocalDateTime.now()
                );
            }
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching weather data: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
        }
        return null;
    }

    public WeatherData saveOrUpdateWeatherData(WeatherData weatherData) {
        WeatherData existingWeatherData = weatherRepo.findByCityName(weatherData.getCityName()).orElse(null);

        if (existingWeatherData != null) {
            existingWeatherData.setDescription(weatherData.getDescription());
            existingWeatherData.setTemperature(weatherData.getTemperature());
            return weatherRepo.save(existingWeatherData);
        }

        return weatherRepo.save(weatherData);
    }


//FORECAST

    public WeatherData[] getWeatherForecast(String city, String unit) {
        return fetchWeatherForecast(city, unit);
    }

    private WeatherData[] fetchWeatherForecast(String city, String unit) {
        String url = String.format("http://api.openweathermap.org/data/2.5/forecast?q=%s&appid=%s&units=%s", city, apiKey, unit);

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String jsonResponse = response.getBody();

            if (jsonResponse != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(jsonResponse);

                JsonNode forecastNode = rootNode.path("list");

                WeatherData[] forecastData = new WeatherData[forecastNode.size()];
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                for (int i = 0; i < forecastNode.size(); i++) {
                    JsonNode forecast = forecastNode.get(i);
                    String description = forecast.path("weather").get(0).path("description").asText();
                    double temperature = forecast.path("main").path("temp").asDouble();
                    double feelsLike = forecast.path("main").path("feels_like").asDouble();
                    int humidity = forecast.path("main").path("humidity").asInt();
                    double windSpeed = forecast.path("wind").path("speed").asDouble();
                    int pressure = forecast.path("main").path("pressure").asInt();
                    String forecastTimeString = forecast.path("dt_txt").asText();
                    LocalDateTime forecastTime = LocalDateTime.parse(forecastTimeString, formatter);

                    forecastData[i] = new WeatherData(
                            null,
                            city,
                            description,
                            temperature,
                            feelsLike,
                            humidity,
                            windSpeed,
                            pressure,
                            forecastTime
                    );
                }
                return forecastData;
            }
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching forecast data: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
        }
        return null;
    }

}