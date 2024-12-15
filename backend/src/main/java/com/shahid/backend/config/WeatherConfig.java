package com.shahid.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class WeatherConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
