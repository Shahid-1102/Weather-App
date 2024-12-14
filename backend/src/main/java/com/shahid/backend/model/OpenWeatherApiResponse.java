package com.shahid.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class OpenWeatherApiResponse {

    private List<Weather> weather;
    private MainWeather main;
    private Wind wind;
    private String name;
    }

    @Data
    class Weather {
        private String description;
        private String icon;
    }

    @Data
    class MainWeather {
        private double temp;
        private double feelsLike;
        private double humidity;
    }

    @Data
    class Wind {
        private double speed;

}
