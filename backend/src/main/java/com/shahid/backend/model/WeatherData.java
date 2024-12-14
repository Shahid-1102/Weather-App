package com.shahid.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "weather_data")
public class WeatherData {

    @Id
    private String id;  // Unique identifier for MongoDB
    private String cityName;
    private String description;
    private double temperature;
    private double feelsLike;
    private int humidity;
    private double windSpeed;
    private int pressure;
    private LocalDateTime timestamp;  // To track the last time the data was fetched
}
