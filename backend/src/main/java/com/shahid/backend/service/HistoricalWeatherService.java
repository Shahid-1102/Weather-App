package com.shahid.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shahid.backend.model.WeatherData;
import com.shahid.backend.repo.WeatherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class HistoricalWeatherService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private WeatherRepo weatherRepo;

    public WeatherData fetchHistoricalWeather(String city, String startDate, String endDate) throws Exception {

        city = normalizeCityName(city);

        Optional<WeatherData> weatherDataOptional = weatherRepo.findByCityName(city);
        if (weatherDataOptional.isEmpty()) {
            throw new Exception("City not found in the database.");
        }

        WeatherData weatherData = weatherDataOptional.get();
        double latitude = weatherData.getLatitude();
        double longitude = weatherData.getLongitude();

        String apiUrl = String.format(
                "https://archive-api.open-meteo.com/v1/archive?latitude=%s&longitude=%s&start_date=%s&end_date=%s&hourly=temperature_2m",
                latitude, longitude, startDate, endDate);

        String response = restTemplate.getForObject(apiUrl, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        if (root.has("hourly")) {
            JsonNode hourlyDataNode = root.get("hourly");
            Map<String, List<String>> hourlyData = mapper.convertValue(hourlyDataNode, new TypeReference<Map<String, List<String>>>() {});
            weatherData.setCityName(city);
            weatherData.setHourlyData(hourlyData);
            return weatherData;
        } else {
            throw new Exception("Invalid response from Open Meteo API");
        }
    }

    private String normalizeCityName(String cityName) {
        if (cityName != null) {
            return cityName.trim().toLowerCase();
        }
        return cityName;
    }
}
