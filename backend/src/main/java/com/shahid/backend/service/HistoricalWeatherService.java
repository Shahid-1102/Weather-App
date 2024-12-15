package com.shahid.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shahid.backend.model.WeatherData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoricalWeatherService {

    @Value("${visualcrossing.api.key}")
    private String apiKey;  // API Key from Visual Crossing

    private static final String BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    private final RestTemplate restTemplate;

    public HistoricalWeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<WeatherData> getHistoricalWeather(String city, LocalDate startDate, LocalDate endDate) {
        List<WeatherData> historicalWeather = new ArrayList<>();

        String formattedCity = city.replace(" ", "%2C"); // If there's any space in the city
        String url = String.format(
                "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/%s/%s/%s&key=%s",
                formattedCity,
                startDate.toString(),
                endDate.toString(),
                apiKey
        );

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String jsonResponse = response.getBody();

            if (jsonResponse != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(jsonResponse);

                JsonNode daysNode = rootNode.path("days");
                for (JsonNode day : daysNode) {
                    WeatherData weatherData = new WeatherData(
                            null,  // MongoDB will generate the ID
                            city,
                            day.path("conditions").asText(),
                            day.path("tempmax").asDouble(),
                            day.path("tempmin").asDouble(),
                            day.path("humidity").asInt(),
                            day.path("windspeed").asDouble(),
                            day.path("pressure").asInt(),
                            LocalDate.parse(day.path("datetime").asText()).atStartOfDay()
                    );
                    historicalWeather.add(weatherData);
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching historical weather data: " + e.getMessage());
        }
        return historicalWeather;
    }
}
