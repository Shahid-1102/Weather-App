package com.shahid.backend.controller;

import com.shahid.backend.model.WeatherData;
import com.shahid.backend.service.HistoricalWeatherService;
import com.shahid.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public ResponseEntity<List<WeatherData>> getHistoricalWeather(
            @RequestParam String city,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            if (!end.isAfter(start)) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            List<WeatherData> historicalWeather = historicalWeatherService.getHistoricalWeather(city, start, end);

            if (historicalWeather != null && !historicalWeather.isEmpty()) {
                return new ResponseEntity<>(historicalWeather, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (DateTimeParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
