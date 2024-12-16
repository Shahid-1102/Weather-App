package com.shahid.backend.controller;

import com.shahid.backend.model.WeatherData;
import com.shahid.backend.service.HistoricalWeatherService;
import com.shahid.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/weather")
@CrossOrigin("*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private HistoricalWeatherService historicalWeatherService;

    @GetMapping
    public ResponseEntity<WeatherData> getWeather(@RequestParam String city) {
        WeatherData weather = weatherService.getWeather(city);
        if (weather != null) {
            return new ResponseEntity<>(weather, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/forecast")
    public ResponseEntity<WeatherData[]> getWeatherForecast(@RequestParam String city) {
        WeatherData[] forecast = weatherService.getWeatherForecast(city);
        if (forecast != null && forecast.length > 0) {
            return new ResponseEntity<>(forecast, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/historical")
    public ResponseEntity<?> getHistoricalData(
            @RequestParam("city") String city,
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        try {
            WeatherData historicalWeather = historicalWeatherService.fetchHistoricalWeather(city, latitude, longitude, startDate, endDate);
            return new ResponseEntity<>(historicalWeather, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
