package com.shahid.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shahid.backend.model.WeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HistoricalWeatherService {

    @Autowired
    private RestTemplate restTemplate;

    public WeatherData fetchHistoricalWeather(String city, double latitude, double longitude, String startDate, String endDate) throws Exception {
        String apiUrl = String.format(
                "https://archive-api.open-meteo.com/v1/archive?latitude=%s&longitude=%s&start_date=%s&end_date=%s&hourly=temperature_2m",
                latitude, longitude, startDate, endDate);

        String response = restTemplate.getForObject(apiUrl, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        if (root.has("hourly")) {
            JsonNode hourlyData = root.get("hourly");
            WeatherData weatherData = new WeatherData();
            weatherData.setCityName(city);
            weatherData.setHourlyData(hourlyData.toString());
            return weatherData;
        } else {
            throw new Exception("Invalid response from Open Meteo API");
        }
    }
}
