package com.shahid.backend.controller;

import com.shahid.backend.model.WeatherData;
import com.shahid.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public ResponseEntity<WeatherData> getWeather(@RequestParam String city, @RequestParam(defaultValue = "metric") String unit) {
        WeatherData weather = weatherService.getWeather(city, unit);
        if (weather != null) {
            return new ResponseEntity<>(weather, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/forecast")
    public ResponseEntity<WeatherData[]> getWeatherForecast(@RequestParam String city, @RequestParam(defaultValue = "metric") String unit) {
        WeatherData[] forecast = weatherService.getWeatherForecast(city, unit);
        if (forecast != null && forecast.length > 0) {
            return new ResponseEntity<>(forecast, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
