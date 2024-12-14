package com.shahid.backend.repo;

import com.shahid.backend.model.WeatherData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WeatherRepo extends MongoRepository<WeatherData, String>{

    Optional<WeatherData> findByCityName(String city);

}
